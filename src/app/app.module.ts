import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable, ViewContainerRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {SearchwordService} from './searchword.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient,HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/';
import {RouterModule,Routes,Router} from '@angular/router';
import { AppComponent } from './app.component';
import {RequestOptions } from '@angular/http';
import { FullviewComponent } from './fullview/fullview.component';
import { ErrhandleComponent } from './errhandle/errhandle.component';

@NgModule({
  declarations: [
    AppComponent,
    FullviewComponent,
    ErrhandleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      {path:'app',component :AppComponent},
      {path:'fullview',component:FullviewComponent},
      {path:'errhandle',component:ErrhandleComponent}
     ])
  ],
  providers: [SearchwordService,
    { provide: RequestOptions, useClass: SearchwordService },
    
  ],
  exports:[
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
