import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public headerItems = ['Overview', 'Mobile', 'Internet', 'TV', 'Support'].map(
		(title, index) => {
			return { title, active: index === 0 };
		},
	);
}
