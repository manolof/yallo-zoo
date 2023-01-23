import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { ENV, getEnv } from '../environments/environment.provider';
import { HttpInterceptorService } from './http-interceptor.service';

@NgModule({
	imports: [BrowserModule, HttpClientModule, AppRoutingModule],
	declarations: [
		AppComponent,
		AnimalCardComponent,
		AnimalListComponent,
		AnimalDetailComponent,
		HeaderComponent,
		FooterComponent,
	],
	providers: [
		{ provide: ENV, useFactory: getEnv },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
