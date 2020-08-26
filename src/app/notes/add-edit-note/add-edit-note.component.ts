import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NotesService } from "./../../_services/notes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css']
})
export class AddEditNoteComponent implements OnInit {

  noteForm : FormGroup;
  submitted = false;
  noteId: any;
  note:any = {
    id:"",
    title:"",
    description:""
  }

  constructor(private fb: FormBuilder,
      private api: NotesService,
      private route: ActivatedRoute,
      private router: Router) { 
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.noteId = params.get("id");
    })
    this.noteForm = this.fb.group({
        id:"",
        title:["",[Validators.required, Validators.minLength(10)]],
        description:["",[Validators.required, Validators.minLength(100)]]
    });

    if(this.noteId != null){
      this.api.getNote(this.noteId).subscribe(response => {
        this.note = response;
        this.noteForm = this.fb.group({
          id:this.note.id,
          title:[this.note.title,[Validators.required]],
          description:[this.note.description,[Validators.required]]
        });
      })
    }

  }

  addorUpdateNote(){
    this.submitted = true;
    if(this.noteForm.invalid){
      return;
    }

    if(this.noteId != null){
      this.api.updateNote(this.noteForm.value).subscribe(response => {
        console.log(response);
        alert('Note updated successfully.')
        //this.toaster.success('Note Added Successfully');
      })
    }else{
      this.api.addNote(this.noteForm.value).subscribe(response => {
        console.log(response);
        alert('Note added successfully.');
        this.router.navigate(['/notes']);
        //this.toaster.success('Note Added Successfully');
      })
    }
  }

  cancel(){
    this.router.navigate(['/notes']);
  }

  get formControls(){
    return this.noteForm.controls;
  }

}
