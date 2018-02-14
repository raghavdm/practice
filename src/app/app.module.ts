import { NgModule } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      noTokenScheme: true,
      headerName: 'x-auth-token',
      tokenGetter: (() => localStorage.getItem('secret_token'))
  }), http, options);
}

const appRoutes: Routes = [
  { path: '', canActivate: [AppService], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [
    AppService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
