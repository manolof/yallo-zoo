import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { AnimalDetailComponent } from './animal-detail.component';
import { HttpService } from '../http.service';

describe('AnimalDetailComponent', () => {
	let component: AnimalDetailComponent;
	let fixture: ComponentFixture<AnimalDetailComponent>;

	const httpServiceMock = {
		getAnimalDetail: jest
			.fn()
			.mockReturnValue(
				of({ id: 1, name: 'Lion', type: 'Mammal', avatar: 'lion.jpg' }),
			),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnimalDetailComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { paramMap: of(convertToParamMap({ id: 1 })) },
				},
				{ provide: HttpService, useValue: httpServiceMock },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AnimalDetailComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get animal detail from http service', () => {
		component.ngOnInit();
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
});
