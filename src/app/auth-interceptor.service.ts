/*
this file is an exmaple of interceptor: 
    - adding some header to every request for AUTH purpose
    
    
interceptor: 
    - can add param to ALL the requests
*/

import {
	HttpEvent,
	HttpEventType,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { reduce, tap } from "rxjs/operators";

//below code will run for every requests that leaves the app, unless manually restrict
export class AuthInterceptorService implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		//ex: restrict the interceptor for specific url
		if (req.url != "someURL") {
		}

		const modifedRequest = req.clone({
			headers: req.headers.append("Auth", "xyz"),
		});

		return next.handle(modifedRequest);
	}
}
