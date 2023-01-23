import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

const routes: Routes = [
	{ path: 'animals', component: AnimalListComponent },
	{ path: 'animals/:id', component: AnimalDetailComponent },
	{ path: '', redirectTo: '/animals', pathMatch: 'full' },
	{ path: '**', redirectTo: '/animals' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
