import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from '../http.service';
import { Animal } from '../animal';

@Component({
	selector: 'app-animal-detail',
	templateUrl: './animal-detail.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalDetailComponent implements OnInit {
	public animal$!: Observable<Animal>;

	private route = inject(ActivatedRoute);
	private httpService = inject(HttpService);

	public ngOnInit() {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get('id')!;
			this.animal$ = this.httpService.getAnimalDetail(id);
		});
	}
}
