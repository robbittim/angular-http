/*
this file is an exmaple of interceptor: 
    - adding some header to every request for AUTH purpose
    
    
interceptor: 
    - can add param to ALL the requests
*/

import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

//below code will run for every requests that leaves the app, unless manually restrict
export class AuthInterceptorService implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		//restrict the interceptor for specific url
		if (req.url != "someURL") {
		}

		console.log("Request is on its way");
		return next.handle(req);
	}
}
