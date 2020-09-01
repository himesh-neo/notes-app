import { Component, OnInit } from '@angular/core';
import { NotesService } from './../_services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  p: number = 1;
  notes;
  
  constructor(private api: NotesService, private router: Router) { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes(){
    this.api.getNotes().subscribe(response => {
      this.notes = []
      let notes: any = response;
      for(let i = 0; i < notes.length; i++){
        if(notes[i].Record.make != 'null'){
          this.notes.push(notes[i])
        }
      }
      // this.notes = response;
    }, (err:HttpErrorResponse) => {
      console.log(err);
    })
  }

  deleteNote(note){
    if(confirm("Are you sure to delete this note?")) {
      let data = {key: note.Key, value: note.Record.make}
      this.api.deleteNote(data).subscribe(response => {
        if(response){
          alert('Note deleted successfully.')
        }else{
          console.log(response);
        }
        this.loadNotes();
      })
    }
  }

  navigateToEdit(note){
    this.router.navigate([`/edit-note/${note.Key}`], {
      state: {
        Key: note.Key,
        Value: note.Record.make
      }
    })
  }

}
