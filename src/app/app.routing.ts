import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AddBottleComponent} from './add-bottle/add-bottle.component';
import {CompartmentComponent} from './compartment/compartment.component';
import {AdminComponent} from './admin/admin.component';
import {AdminUserGuard} from './guards/admin-user.guard';
import {SimpleUserGuard} from './guards/simple-user.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard, SimpleUserGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminUserGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'addBottle', component: AddBottleComponent, canActivate: [AuthGuard, SimpleUserGuard] },
  { path: 'compartments', component: CompartmentComponent, canActivate: [AuthGuard, SimpleUserGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
