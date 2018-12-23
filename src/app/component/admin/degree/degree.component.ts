import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder , FormArray, NgForm } from '@angular/forms';
import { DegreeService } from 'src/app/services/degree/degree.service';
import { AuthService } from 'src/app/services/auth/auth.service';
declare var M: any;
@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {

  constructor(private degreeService: DegreeService, private authService: AuthService, private formBuilder: FormBuilder) { }
  degreeForm: FormGroup;
  degrees: any;
  Button: any;
  submitted:boolean;
  ngOnInit() {
    this.submitted=false;
    this.createForm();
    this.getDegrees();
  }
  get f() { return this.degreeForm.controls; }
  onSubmit(form: NgForm) {
    this.submitted=true;
    if(form.valid){
      if ( form.value._id === '') {
        this.degreeService.createDegree( this.degreeForm.get('name').value).subscribe((response: any) => {
          if ( response.error ) {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getDegrees();
            this.createForm();
          } else {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getDegrees();
            this.createForm();
          }
        });
      } else {
        this.degreeService.updateDegree(form.value._id, form.value.name).subscribe((response: any) => {
          if ( response.error ) {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getDegrees();
            this.createForm();
          } else {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getDegrees();
            this.createForm();
          }
        });
      }
    }else
    {
      M.toast({ html: 'Please Check The Form' , classes: 'roundeds'});
    }
  }
  createForm() {
    this.submitted=false;
    this.degreeForm = this.formBuilder.group({
      _id: '',
      name: ['',Validators.required]
    });
    this.Button = 'Create';
  }
  getDegrees() {
    this.degreeService.readDegree().subscribe((response: any) => {
     this.degrees = response.docs;
    });

  }
  deleteDegree(id: string) {
  this.degreeService.deleteDegree(id).subscribe((response: any) => {
    if ( response.error ) {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getDegrees();
      this.createForm();
    } else {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getDegrees();
      this.createForm();
    }
  });
  }
  updateDegree(id: string, name: string) {
    this.Button = 'Update';
    this.degreeForm.setValue({
      _id: id,
      name: name
    });
  }

}