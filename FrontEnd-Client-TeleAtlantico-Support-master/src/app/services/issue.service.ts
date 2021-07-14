import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Issue } from '../models/issue.model';

const base_url = environment.base_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor( private http:HttpClient ) { }  

  addIssue( issue: Issue ){
    const url = `${base_url}/issue/add`;
    return this.http.post<any>(url, JSON.stringify(issue), httpOptions)
    .pipe(
      map(this.extractData),
    catchError(this.handleError<any>('getIssuesByClientId'))
    );
  }

  getIssuesByClientId(id:number){
    const url = `${base_url}/issue/issues/${id}`;
    return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError<any>('getIssuesByClientId'))
    );
  }

  getIssueById(id:number){
    const url = `${base_url}/issue/${id}`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getIssueById'))
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





}
