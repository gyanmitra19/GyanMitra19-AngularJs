import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { EventRegistrationService } from 'src/app/services/eventRegistration/event-registration.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { UserService } from 'src/app/services/user/user.service';

declare var M: any;

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  workshops: Array<any>;
  departments: Array<any>;
  searchText: String;
  isCartConfirmed: Boolean = true;

  constructor(private eventService: EventService, private userService: UserService, private eventRegistrationService: EventRegistrationService, private authService: AuthService, private deptService: DepartmentService) {
    this.loadFull();
  }
  ngOnInit() {
    this.loadFull();
    if (this.authService.isLoggedIn()) {
      this.userService.isCartConfirmed(JSON.parse(localStorage.getItem('user')).id).subscribe((response: any) => {
        if (!response.error) {
          this.isCartConfirmed = response.isCartConfirmed
        }
      })
      $(document).ready(function() {
  
        $(".selLabel").click(function () {
          $('.dropdown').toggleClass('active');
        });
        
        $(".dropdown-list li").click(function() {
          $('.selLabel').text($(this).text());
          $('.dropdown').removeClass('active');
          $('.selected-item p span').text($('.selLabel').text());
        });
        
      });
    }
  }
  hello() {
    console.log(this.searchText);
  }

  reloadEvents() {
    this.loadFull();
  }

  selectWorkshop(_id: string) {
    let user_id = JSON.parse(localStorage.getItem('user')).id;
    this.eventRegistrationService.checkWorkshopRegistration(_id, user_id).subscribe((response: any) => {
      if (response.error) {
        M.toast({ html: response.msg, classes: 'roundeds' });
      } else {
        if (response.registered) {
          M.toast({ html: response.msg, classes: 'roundeds' });
        }
        else {
          this.eventRegistrationService.createWorkshopRegistration(_id, user_id).subscribe((response: any) => {
            if (response.error) {
              M.toast({ html: response.msg, classes: 'roundeds' });
            } else {
              M.toast({ html: response.msg, classes: 'roundeds' });
            }
          })
        }
      }
    })
  }

  setSearchText(text: string){
    this.searchText = text;
  }

  loadFull() {
    this.eventService.readWithEventCategory('Workshop').subscribe((response: any) => {
      this.workshops = response;

    })
    this.deptService.readDepartment(0).subscribe((response: any) => {
      this.departments = response;
    })
  }

}
