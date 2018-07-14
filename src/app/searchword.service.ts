import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import {RequestOptions,Headers} from '@angular/http';

import 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class SearchwordService {
  private headers = new HttpHeaders({'Accept': 'application/json','app_id':'28cea68b','app_key':'b1902b37402c62f1f83c14230387f78f'});
  public baseurl="https://od-api.oxforddictionaries.com/api/v1";
  public language = "en";
  public word:string;
  public bphrase:string;
  public aphrase:string;
  
  
  constructor(private _http:HttpClient) {
    console.log("http-service called");
  }
  
    private handleError(err: HttpErrorResponse) {
      console.log("Handle error Http calls")
      console.log(err.message);
      console.log(err.status);
      return Observable.throw(err.message);
    }
    public autocomplete(w):any {  
      this.word = w.toLowerCase() ;
      let myResponse = this._http.get('/oxford/'+this.word);
      return myResponse;

     }

     public alldetails(w):any {  
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app_id', '28cea68b');
      headers = headers.append('app_key','b1902b37402c62f1f83c14230387f78f');
      this.word = w.toLowerCase() ;
      let res=  this._http.get('/sa/'+this.word)
      return res;
    }

    public callphrases(w):any {  
      let resa:any=[];
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app_id', '28cea68b');
      headers = headers.append('app_key','b1902b37402c62f1f83c14230387f78f');
      this.word = w.toLowerCase() ;
      this.aphrase=this.word+" ";
      resa = this._http.get('/oxford/'+this.word);
      return resa;
    }
    public allphrases(w):any {  
      let resb;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app_id', '28cea68b');
      headers = headers.append('app_key','b1902b37402c62f1f83c14230387f78f');
      this.word = w.toLowerCase() ;
      
      resb= this._http.get('/sa/'+this.word);
      return resb;
    }

    public synm(w):any {  
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('app_id', '28cea68b');
      headers = headers.append('app_key','b1902b37402c62f1f83c14230387f78f');
      this.word = w.toLowerCase() ;
      let res=  this._http.get('/sa/'+this.word+'/synonyms;antonyms')
      return res;

  }
}
