import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AddBottleComponent} from './add-bottle/add-bottle.component';
import {CompartmentComponent} from './compartment/compartment.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'addBottle', component: AddBottleComponent },
  { path: 'compartments', component: CompartmentComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
