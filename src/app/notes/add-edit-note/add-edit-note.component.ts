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
    key:"",
    value:""
  }

  constructor(private fb: FormBuilder,
      private api: NotesService,
      private route: ActivatedRoute,
      private router: Router) { 
    if(this.router.getCurrentNavigation().extras.state){
      let state = this.router.getCurrentNavigation().extras.state;
      this.note.key = state.Key
      this.note.value = state.Value
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.key = params.get("Key");
    })
    this.noteForm = this.fb.group({
        key: [this.note.key],
        value:[this.note.value, [Validators.required]]
    });

    if(this.key != null){
      // this.api.getNote({key:this.key}).subscribe(response => {
        // this.note = response;
        // this.noteForm = this.fb.group({
        //   key:[this.note.docType,[Validators.required]],
        //   value:[this.note.make,[Validators.required]]
        // });
      // })
    }

  }

  addorUpdateNote(){
    this.submitted = true;
    if(this.noteForm.invalid){
      return;
    }
    this.note = this.noteForm.value;

    if(this.note.key != null && this.note.key != ""){
      let data = [this.note]
      this.api.updateNote(data).subscribe(response => {
        if(response){
          alert('Note saved successfully.')
        }else{
          console.log(response);
        }
        this.router.navigate(['/notes']);
        //this.toaster.success('Note Added Successfully');
      })
    }else{
      let rId = this.generateRandomNo();
      this.note.key = `choice${rId}`
      let data = [this.note]
      this.api.addNote(data).subscribe(response => {
        console.log(JSON.stringify(response))
        if(response){
          alert('Note added successfully.')
        }else{
          console.log(response);
        }
        this.router.navigate(['/notes']);
        //this.toaster.success('Note Added Successfully');
      })
    }
  }

  generateRandomNo() {
    return Math.floor((Math.random() * 100) + 1);
  }

  cancel(){
    this.router.navigate(['/notes']);
  }

  get formControls(){
    return this.noteForm.controls;
  }

}
