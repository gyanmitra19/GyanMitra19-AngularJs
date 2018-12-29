import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder , FormArray, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParticipationstatusService } from 'src/app/services/participationstatus/participationstatus.service';
declare var M:any;
@Component({
  selector: 'app-participantstatus',
  templateUrl: './participantstatus.component.html',
  styleUrls: ['./participantstatus.component.css']
})
export class ParticipantstatusComponent implements OnInit {

  constructor(private participantservice: ParticipationstatusService,private authService: AuthService, private formBuilder: FormBuilder) { }

  ParticipationStatusForm: FormGroup;
  participantStatus: any;
  Button: any;
  submitted:boolean;
  currentPage:any;
  ngOnInit() {
    this.submitted=false;
    this.currentPage=1;
    this.createForm();
    this.getParticipantStatus(this.currentPage);
  }
  nextPage(){
    this.currentPage = this.currentPage + 1;
    this.getParticipantStatus(this.currentPage);
  }
  
  previousPage() {
    if(this.currentPage == 1) {
    }
    else{
      this.currentPage = this.currentPage -1;
      this.getParticipantStatus(this.currentPage);
    }
  }
  get f() { return this.ParticipationStatusForm.controls; }
  onSubmit(form: NgForm) {
    this.submitted=true;
    if(form.valid){
      if ( form.value._id === '') {
        this.participantservice.createParticipationStatus( this.ParticipationStatusForm.get('name').value,this.ParticipationStatusForm.get('score').value).subscribe((response: any) => {
          if ( response.error ) {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getParticipantStatus(this.currentPage);
            this.createForm();
          } else {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getParticipantStatus(this.currentPage);
            this.createForm();
          }
        });
      } else {
        this.participantservice.updateParticipationStatus(form.value._id, form.value.name,form.value.score).subscribe((response: any) => {
          if ( response.error ) {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getParticipantStatus(this.currentPage);
            this.createForm();
          } else {
            M.toast({ html: response.msg , classes: 'roundeds'});
            this.getParticipantStatus(this.currentPage);
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
    this.ParticipationStatusForm = this.formBuilder.group({
      _id: '',
      name: ['',Validators.required],
      score: ['0']
    });
    this.Button = 'Create';
  }
  getParticipantStatus(page: any) {
    this.participantservice.readParticipationStatus(page).subscribe((response: any) => {
     this.participantStatus = response.docs;
    });

  }
  deleteParticipantStatus(id: string) {
  this.participantservice.deleteParticipationStatus(id).subscribe((response: any) => {
    if ( response.error ) {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getParticipantStatus(this.currentPage);
      this.createForm();
    } else {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getParticipantStatus(this.currentPage);
      this.createForm();
    }
  });
  }
  updateParticipantStatus(id: string, name: String,score: String) {
    this.Button = 'Update';
    this.ParticipationStatusForm.setValue({
      _id: id,
      name: name,
      score: score
    });
  }


}