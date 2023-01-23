import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

const CACHE = new Map<string, any>();

@Injectable({
	providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
	public intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		if (req.method !== 'GET') {
			return next.handle(req);
		}

		const cachedResponse = CACHE.get(req.urlWithParams);
		if (cachedResponse) {
			return of(cachedResponse);
		}

		return next.handle(req).pipe(
			map(event => {
				CACHE.set(req.urlWithParams, event);
				return event;
			}),
		);
	}
}
