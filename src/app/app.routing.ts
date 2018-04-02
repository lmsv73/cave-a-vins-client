import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AddBottleComponent} from './components/add-bottle/add-bottle.component';
import {CompartmentComponent} from './components/compartment/compartment.component';
import {AdminComponent} from './components/admin/admin.component';
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
