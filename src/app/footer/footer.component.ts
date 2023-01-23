import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	public footerItems = Array.from({ length: 4 }, (_, i) => ({
		title: `Column ${i + 1}`,
		items: Array.from({ length: 5 }, (_, j) => `Item ${j + 1}`),
	}));
}
