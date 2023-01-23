import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Animal, AnimalsDto } from './animal';
import { ENV } from '../environments/environment.provider';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	private randomAnimals: Animal[] = [];
	private env = inject(ENV);
	private http = inject(HttpClient);

	public getAnimals(forceRefresh = false): Observable<Animal[]> {
		let params = new HttpParams();
		if (forceRefresh) {
			this.randomAnimals.length = 0;
			params = params.append('nocache', new Date().getTime().toString());
		}

		return this.http.get<AnimalsDto>(this.env.apiUrl, { params }).pipe(
			map(animals => {
				if (this.randomAnimals.length === 0) {
					// Get 6 random animals, for exercise purposes only..
					const shuffled = animals.items.sort(() => 0.5 - Math.random());
					this.randomAnimals = shuffled.slice(0, 6);
				}

				return this.randomAnimals;
			}),
			catchError(this.handleError<Animal[]>('getAnimals', [])),
		);
	}

	public getAnimalDetail(id: string): Observable<Animal> {
		return this.http
			.get<Animal>(`${this.env.apiUrl}/${id}`)
			.pipe(catchError(this.handleError<Animal>('getAnimalDetail')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.error(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
