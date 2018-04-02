import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BottleService, BottleTypeService, CompartmentService, UserService} from './api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {OauthService} from './api/api/oauth.service';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AddBottleComponent} from './components/add-bottle/add-bottle.component';
import {HeaderComponent} from './components/header/header.component';
import {EditBottleComponent} from './components/edit-bottle/edit-bottle.component';
import {DeleteBottleComponent} from './components/delete-bottle/delete-bottle.component';
import {CompartmentComponent} from './components/compartment/compartment.component';
import {EditCompartmentComponent} from './components/edit-compartment/edit-compartment.component';
import {LimitToPipe} from './pipes/limit-to/limit-to.pipe';
import {DeleteCompartmentComponent} from './components/delete-compartment/delete-compartment.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminUserGuard} from './guards/admin-user.guard';
import {SimpleUserGuard} from './guards/simple-user.guard';
import {EditBottleTypeComponent} from './components/edit-bottle-type/edit-bottle-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddBottleComponent,
    HeaderComponent,
    EditBottleComponent,
    DeleteBottleComponent,
    CompartmentComponent,
    EditCompartmentComponent,
    LimitToPipe,
    DeleteCompartmentComponent,
    AdminComponent,
    EditBottleTypeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    routing,
    FormsModule
  ],
  providers: [
    UserService,
    CompartmentService,
    BottleTypeService,
    BottleService,
    AuthGuard,
    AdminUserGuard,
    SimpleUserGuard,
    OauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditBottleComponent,
    DeleteBottleComponent,
    EditCompartmentComponent,
    DeleteCompartmentComponent,
    EditBottleTypeComponent
  ]
})
export class AppModule { }
