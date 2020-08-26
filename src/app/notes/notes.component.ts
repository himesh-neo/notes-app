import { Component, OnInit } from '@angular/core';
import { NotesService } from './../_services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  p: number = 1;
  notes;
  
  constructor(private api: NotesService) { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes(){
    this.api.getNotes().subscribe(response => {
      this.notes = response;
    }, (err:HttpErrorResponse) => {
      console.log(err);
    })
  }

  deleteNote(id){
    if(confirm("Are you sure to delete this note?")) {
      this.api.deleteNote(id).subscribe(response => {
        console.log(response);
        alert('Note deleted successfully.')
        this.loadNotes();
      })
    }
  }

}
