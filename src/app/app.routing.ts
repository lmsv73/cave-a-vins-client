import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AddCompartmentComponent} from './add-compartment/add-compartment.component';
import {AddBottleComponent} from './add-bottle/add-bottle.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'addCompartment', component: AddCompartmentComponent },
  { path: 'addBottle', component: AddBottleComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
