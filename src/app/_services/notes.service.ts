import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get('https://5f449ed43fb92f00167539c7.mockapi.io/api/v1/notes')
  }

  addNote(data){
    return this.http.post('https://5f449ed43fb92f00167539c7.mockapi.io/api/v1/notes/', data).pipe(
      map(res => {
        return res;
      })
    )
  }

  updateNote(data){
    return this.http.put('https://5f449ed43fb92f00167539c7.mockapi.io/api/v1/notes/'+data.id, data).pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteNote(id){
    return this.http.delete('https://5f449ed43fb92f00167539c7.mockapi.io/api/v1/notes/'+id).pipe(
      map( res => {
        return res;
      })
    );
  }

  getNote(id){
    return this.http.get('https://5f449ed43fb92f00167539c7.mockapi.io/api/v1/notes/'+id).pipe(
      map(res => {
        return res;
      })
    )
  }
}
