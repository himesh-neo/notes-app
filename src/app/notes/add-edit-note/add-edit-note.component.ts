import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NotesService } from "./../../_services/notes.service";
import { ActivatedRoute, Router } from "@angular/router";
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css']
})
export class AddEditNoteComponent implements OnInit {

  noteForm : FormGroup;
  submitted = false;
  key: any;
  note:any = {
    docType:"",
    make:""
  }

  constructor(private fb: FormBuilder,
      private api: NotesService,
      private route: ActivatedRoute,
      private router: Router) { 
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.key = params.get("key");
    })
    this.noteForm = this.fb.group({
        docType:["",[Validators.required]],
        make:["",[Validators.required]]
    });

    if(this.key != null){
      this.api.getNote({key:this.key}).subscribe(response => {
        this.note = response;
        this.noteForm = this.fb.group({
          docType:[this.note.docType,[Validators.required]],
          make:[this.note.make,[Validators.required]]
        });
      })
    }

  }

  addorUpdateNote(){
    this.submitted = true;
    if(this.noteForm.invalid){
      return;
    }

    if(this.key != null){
      let data = [{
        Key: this.key,
        Record:{
          docType:this.noteForm.value.docType,
          make:this.noteForm.value.make
        }
      }]
      this.api.updateNote(data).subscribe(response => {
        if(response == []){
          alert('Note updated successfully.')
        }else{
          alert(response);
        }
        this.router.navigate(['/notes']);
        //this.toaster.success('Note Added Successfully');
      })
    }else{
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 10;
      let str = this.generateRandomString(lengthOfCode, possible);
      let data = [{
        Key: str,
        Record:{
          docType:this.noteForm.value.docType,
          make:this.noteForm.value.make
        }
      }]
      this.api.addNote(data).subscribe(response => {
        if(response == []){
          alert('Note added successfully.')
        }else{
          alert(response);
        }
        this.router.navigate(['/notes']);
        //this.toaster.success('Note Added Successfully');
      })
    }
  }

  generateRandomString(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  cancel(){
    this.router.navigate(['/notes']);
  }

  get formControls(){
    return this.noteForm.controls;
  }

}
