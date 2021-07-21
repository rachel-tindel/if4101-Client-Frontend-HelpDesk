import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


const base_url = environment.base_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor( private http:HttpClient ) { }


  addComment( comment: Comment ){
    const url = `${base_url}/comment/add`;
    console.log("comentario agregado");
    return this.http.post<any>(url, JSON.stringify(comment), httpOptions)
    .pipe(
      map(this.extractData),
      catchError(this.handleError<any>('addComment'))
      );
  }

  getCommentByIssueId(reportnumber:String){
    const url = `${base_url}/comment/comments/${reportnumber}`;
    return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError<any>('getCommentByIssueId'))
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
