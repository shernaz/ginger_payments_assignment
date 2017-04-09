/**
 * Created by shalu on 08/04/17.
 */

import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Payment, Filter} from "./payment"
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PaymentService {

  constructor(private _http: Http) {}

  private  _ApiUrl = 'http://localhost:3000/payments?'; // URL to web api

  getPaymentData(filters: Filter[] = null, sort_field:string = null, sort_order:string = null, limit:number = 0, callback: Function = null) {

    let queryURL = this._ApiUrl;

    if(filters != null){
      for(let filter of filters){
        queryURL = queryURL + filter.key + "=" + filter.value + "&";
      }
    }

    if(sort_field != null){
      queryURL = queryURL + "_sort=" + sort_field + "&_order=" + sort_order;
    }

    if(limit>0){
      queryURL = queryURL + "&_limit=" + limit;
    }

    console.log(queryURL);

    let promise = this._http.get(queryURL)
        .map(res => <Payment[]>res.json())
        .catch(this.handleError)
        .toPromise();

    if(callback != null) {
      promise.then(value => callback(value));
    }

    return promise;
  }

  addPaymentData(payment: Object) : Observable<Response>{
    console.log(payment);
    let bodyString = JSON.stringify(payment);
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this._http.post(this._ApiUrl, bodyString, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Server error');
  }
}
