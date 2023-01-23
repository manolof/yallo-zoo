import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Animal } from '../animal';

@Component({
	selector: 'app-animal-card',
	templateUrl: './animal-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent {
	@Input() public animal!: Animal;
}
