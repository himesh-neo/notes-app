import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { AddEditNoteComponent } from './notes/add-edit-note/add-edit-note.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'add-note', component: AddEditNoteComponent },
  { path: 'edit-note/:key', component: AddEditNoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
