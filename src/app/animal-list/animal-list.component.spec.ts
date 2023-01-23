import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AnimalCardComponent } from '../animal-card/animal-card.component';

import { HttpService } from '../http.service';
import { AnimalListComponent } from './animal-list.component';

describe('AnimalListComponent', () => {
	let component: AnimalListComponent;
	let fixture: ComponentFixture<AnimalListComponent>;

	const httpServiceMock = {
		getAnimals: jest.fn(),
	};

	const animals = [
		{ id: 1, name: 'Tiger', type: 'Mammal', avatar: 'tiger.jpg' },
		{ id: 2, name: 'Lion', type: 'Mammal', avatar: 'lion.jpg' },
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AnimalListComponent, AnimalCardComponent],
			providers: [{ provide: HttpService, useValue: httpServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(AnimalListComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show loading text if still retrieving data', () => {
		httpServiceMock.getAnimals.mockReturnValue(undefined);
		component.ngOnInit();
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should fetch and render the animals list from the API', () => {
		httpServiceMock.getAnimals.mockReturnValue(of(animals));
		component.ngOnInit();
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should refresh the animals list', () => {
		httpServiceMock.getAnimals.mockReturnValue(of(animals));
		component.updateAnimals();
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
});
