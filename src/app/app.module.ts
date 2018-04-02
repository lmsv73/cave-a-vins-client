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
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AddBottleComponent} from './add-bottle/add-bottle.component';
import {HeaderComponent} from './header/header.component';
import {EditBottleComponent} from './edit-bottle/edit-bottle.component';
import {DeleteBottleComponent} from './delete-bottle/delete-bottle.component';
import {CompartmentComponent} from './compartment/compartment.component';
import {EditCompartmentComponent} from './edit-compartment/edit-compartment.component';
import {LimitToPipe} from './limit-to.pipe';
import {DeleteCompartmentComponent} from './delete-compartment/delete-compartment.component';

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
    DeleteCompartmentComponent
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
    DeleteCompartmentComponent
  ]
})
export class AppModule { }
