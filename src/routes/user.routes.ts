import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/component/admin/home/home.component';
import { AboutComponent } from 'src/app/component/user/about/about.component';
import { EventsComponent } from 'src/app/component/user/events/events.component';
import { WorkshopsComponent } from 'src/app/component/user/workshops/workshops.component';
import { CartComponent } from 'src/app/component/user/cart/cart.component';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';
import { LoginComponent } from 'src/app/component/user/login/login.component';
import { RegisterComponent } from 'src/app/component/user/register/register.component';
import { ActivationComponent } from 'src/app/component/user/activation/activation.component';
import { UserAccomodationComponent } from 'src/app/component/user/user-accomodation/user-accomodation.component'


export const USER_ROUTE: Routes = [
     { path: 'home', component: HomeComponent },
     { path: 'about', component: AboutComponent },
     { path: 'events', component: EventsComponent },
     { path: 'workshops', component: WorkshopsComponent }, 
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'activate/:id/:hash',component:ActivationComponent},
     { path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
     { path: 'accomodation', component: UserAccomodationComponent}
];