import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ENV } from '../environments/environment.provider';
import { AnimalsDto } from './animal';
import { HttpService } from './http.service';

describe('HttpService', () => {
	let httpService: HttpService;
	let httpTestingController: HttpTestingController;

	const animals: AnimalsDto = {
		items: [
			'Lion',
			'Tiger',
			'Giraffe',
			'Elephant',
			'Cat',
			'Dog',
			'Bat',
			'Goat',
			'Platypus',
		].map((a, i) => ({
			id: i.toString(),
			name: a,
			type: 'Mammal',
			avatar: `${a.toLowerCase()}.jpg`,
		})),
	};

	const env = { production: true, apiUrl: 'http://test.com' };

	const fixedDate = new Date('2021-01-01T00:00:00.000Z');

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpService, { provide: ENV, useValue: env }],
		});

		httpService = TestBed.inject(HttpService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => ({}));
		jest.spyOn(Math, 'random').mockImplementation(() => 0.1);
		jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);
	});

	afterEach(() => {
		jest.clearAllMocks();
		httpTestingController.verify();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should be created', () => {
		expect(httpService).toBeTruthy();
	});

	describe('getAnimals', () => {
		it('should return an array of animals', () => {
			httpService.getAnimals().subscribe(data => {
				expect(data).toMatchSnapshot();
			});

			const req = httpTestingController.expectOne({
				method: 'GET',
				url: env.apiUrl,
			});
			expect(req.request.params.get('nocache')).toBeFalsy();
			req.flush(animals);
		});

		it('should return an array of animals, bypassing cache', () => {
			httpService.getAnimals(true).subscribe(data => {
				expect(data).toMatchSnapshot();
			});

			const req = httpTestingController.expectOne({
				method: 'GET',
				url: `${env.apiUrl}?nocache=${fixedDate.getTime()}`,
			});
			req.flush(animals);
		});

		it('should handle errors', () => {
			httpService.getAnimals().subscribe(data => {
				expect(data).toMatchSnapshot();
			});

			const req = httpTestingController.expectOne({
				method: 'GET',
				url: env.apiUrl,
			});
			req.flush('Error', { status: 404, statusText: 'Not Found' });

			expect((console.error as jest.Mock).mock.calls).toMatchSnapshot();
		});
	});

	describe('getAnimalDetail', () => {
		const animalId = '1';

		it('should return a single animal', () => {
			httpService.getAnimalDetail(animalId).subscribe(data => {
				expect(data).toMatchSnapshot();
			});

			const req = httpTestingController.expectOne({
				method: 'GET',
				url: `${env.apiUrl}/${animalId}`,
			});
			req.flush(animals.items[0]);
		});

		it('should handle errors', () => {
			httpService.getAnimalDetail(animalId).subscribe(data => {
				expect(data).toMatchSnapshot();
			});

			const req = httpTestingController.expectOne({
				method: 'GET',
				url: `${env.apiUrl}/${animalId}`,
			});
			req.flush('Error', { status: 404, statusText: 'Not Found' });

			expect((console.error as jest.Mock).mock.calls).toMatchSnapshot();
		});
	});
});
