import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNoteComponent } from './add-edit-note.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AddEditNoteComponent', () => {
  let component: AddEditNoteComponent;
  let fixture: ComponentFixture<AddEditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ AddEditNoteComponent ],
      providers: [
        {provide: ToastrService, useClass: ToastrService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
