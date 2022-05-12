import {
	HttpClient,
	HttpEventType,
	HttpHeaders,
	HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
	error = new Subject<string>();

	constructor(private http: HttpClient) {}

	createAndStorePost(title: string, content: string) {
		const postData: Post = { title: title, content: content };
		// Send Http request

		/*
        -------------------------------
        defined response data type:
        -------------------------------
		the response type for following is a object: {some property: type of that property}
		
        http.post < {key:string } >

        */

		this.http
			.post<{ name: string }>(
				"https://ng-complete-guide-896f1-default-rtdb.firebaseio.com/posts.json",
				postData,
				//observe: response: full HTTP response object - has info statusCode/Header/etc
				{
					// observe:'body'
					observe: "response",
				}
			)
			.subscribe(
				(responseData) => {
					console.log(responseData);
				},
				(error) => {
					this.error.next(error.message);
				}
			);
	}

	fetchPosts() {
		/*
        -------------------------------
        set params: mutiple params
        -------------------------------
        */
		let mutipleParams = new HttpParams();
		mutipleParams = mutipleParams.append("params1", "params1Value");
		mutipleParams = mutipleParams.append("params2", "params2Value");

		/*
        -------------------------------
        defined response data type:
        -------------------------------
		the response type for following is a object {some property: type of that property}
	    
        http.get < {key:string } >
        */
		return this.http
			.get<{ [key: string]: Post }>(
				"https://ng-complete-guide-896f1-default-rtdb.firebaseio.com/posts.json",

				{
					//add headers: {key: value}
					headers: new HttpHeaders({ "Custom-Header": "Hello" }),

					/*
	                   -------------------------------
                        set params: single params
                       -------------------------------
				    	https://ng-complete-guide-896f1-default-rtdb.firebaseio.com/posts.json?print=pretty
					                       params_name, params_value */
					params: new HttpParams().set("print", "pretty"),

					//*mutiple params:
					// params:mutipleParams

					// responseType: "text",
				}
			)
			.pipe(
				map((responseData) => {
					const postsArray: Post[] = [];
					for (const key in responseData) {
						if (responseData.hasOwnProperty(key)) {
							postsArray.push({ ...responseData[key], id: key });
						}
					}
					return postsArray;
				}),
				catchError((errorRes) => {
					//when error occurs: send to analytics server / write log ...
					return throwError(errorRes);
				})
			);
	}

	deletePosts() {
		return this.http
			.delete(
				"https://ng-complete-guide-896f1-default-rtdb.firebaseio.com/posts.json",
				{
					observe: "events",
					// responseType: "blob",
					responseType: "json",
				}
			)
			.pipe(
				tap((event) => {
					console.log("observe: event = " + event);

					//using event, check if getting any response back?
					if (event.type == HttpEventType.Response) {
						console.log("event body = " + event.body);
					}
				})
			);
	}
}
