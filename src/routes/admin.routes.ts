import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/component/admin/home/home.component';
import { CollegeComponent } from 'src/app/component/admin/college/college.component';
import { CategoryComponent } from '../app/component/admin/category/category.component';
import { DegreeComponent } from '../app/component/admin/degree/degree.component';
import { DepartmentComponent } from '../app/component/admin/department/department.component';
import { AdminEventComponent } from '../app/component/admin/admin-event/admin-event.component';
import { ParticipantstatusComponent } from 'src/app/component/admin/participantstatus/participantstatus.component';
import { RegistrationComponent } from 'src/app/component/admin/registration/registration.component';
import { NewRegistrationComponent } from 'src/app/component/admin/new-registration/new-registration.component';
import { YearComponent } from 'src/app/component/admin/year/year.component';
import { CourseComponent } from 'src/app/component/admin/course/course.component';
import { RoleComponent } from 'src/app/component/admin/role/role.component';
import { AdminUsersComponent } from 'src/app/component/admin/admin-users/admin-users.component';



export const ADMIN_ROUTE: Routes = [
     {path: 'home', component:HomeComponent },
     {path: 'college', component:CollegeComponent},
     {path: 'category', component:CategoryComponent},
     {path: 'degree', component:DegreeComponent},
     {path: 'department',component:DepartmentComponent},
     { path: 'events', component: AdminEventComponent },
     { path: 'year', component: YearComponent },
     {path:'course' ,component:CourseComponent},
     {path: 'participationstatus', component:ParticipantstatusComponent},
     { path: 'registration', component: RegistrationComponent },
     { path: 'new_registration', component: NewRegistrationComponent },
     { path: 'role', component: RoleComponent },
     {path:'users',component:AdminUsersComponent}
];
