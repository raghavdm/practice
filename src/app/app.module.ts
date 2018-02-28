import { NgModule } from '@angular/core';
import { NgxCarouselModule } from 'ngx-carousel';
import { RouterModule, Routes } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    EditorModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    NgxCarouselModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
