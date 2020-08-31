import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get(environment.apiUrl+'/getAllNotes');
  }

  addNote(data){
    return this.http.post(environment.apiUrl+'/submitNotes', data).pipe(
      map(res => {
        return res;
      })
    )
  }

  updateNote(data){
    return this.http.post(environment.apiUrl+'/changeNotes', data).pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteNote(data){
    return this.http.post(environment.apiUrl+'/removeNote', data).pipe(
      map( res => {
        return res;
      })
    );
  }

  getNote(key){
      return this.http.get(environment.apiUrl+'/getNote'+key).pipe(
      map(res => {
        return res;
      })
    )
  }
}
