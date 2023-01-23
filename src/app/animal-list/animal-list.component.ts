import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';

import { HttpService } from '../http.service';
import { Animal } from '../animal';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-animal-list',
	templateUrl: './animal-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent implements OnInit {
	public animals$!: Observable<Animal[]>;

	private httpService = inject(HttpService);

	public ngOnInit() {
		this.animals$ = this.httpService.getAnimals();
	}

	public updateAnimals() {
		this.animals$ = this.httpService.getAnimals(true);
	}
}
