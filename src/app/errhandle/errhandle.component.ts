import { ActivatedRoute, Router,Params, ParamMap } from "@angular/router";
import { Component, OnInit, ViewContainerRef, NgModule} from "@angular/core";
import { SearchwordService } from '../searchword.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import 'rxjs';
import { map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-errhandle',
  templateUrl: './errhandle.component.html',
  styleUrls: ['./errhandle.component.css']
})
export class ErrhandleComponent implements OnInit {

  constructor(public _route:ActivatedRoute,public router:Router,public searchword:SearchwordService,private location:Location,
    private toastr:ToastrService, vcr: ViewContainerRef) { }
public st:any;
public statustring:any;
public statusres:any;
public statusttl:any;
  ngOnInit() {

    this._route.queryParams.subscribe((params: Params) => {
      if(params.e!=undefined && params.e!=null)
      {
        this.st = params.e;
        if(this.st==400)
        {
          this.statusttl="Bad Request";
          this.statusres=this.st;
          this.statustring="The request was invalid or cannot be otherwise served. An accompanying error message will explain further. "
        }
        else if(this.st==403)
        {
          this.statusttl="Authentication failed";
          this.statusres=this.st;
          this.statustring=`The request failed due to invalid credentials.
          Please check that the app_id and app_key are correct, and that the URL you are trying to access is correct. These can be found in the API Credentials pag`;

        }
        else if(this.st==404)
        {
          this.statusttl="Not Found";
          this.statusres=this.st;
          this.statustring=`No information available or the requested URL was not found on the server. 
          For example, when the headword could not be found, a region or domain identifier do not exist, or the headword does not contain any attribute that match the filters in the request. It may also be the case that the URL is misspelled or incomplete.`;
        }
        else if(this.st==414)
        {
          this.statusttl="Request URI Too Long";
          this.statusres=this.st;
          this.statustring=`Your word_id exceeds the maximum 128 characters. Reduce the string that is passed to the API by calling only individual words.`;
        }
        else if(this.st==500)
        {
          this.statusttl="Authentication failed";
          this.statusres=this.st;
          this.statustring=`Something is broken. Please contact us so the Oxford Dictionaries API team can investigate.`;
        }
        else if(this.st==502)
        {
          this.statusttl="Bad Gateway";
          this.statusres=this.st;
          this.statustring=`Oxford Dictionaries API is down or being upgraded.`;
        }
        else if(this.st==503)
        {
          this.statusttl="Service Unavailable";
          this.statusres=this.st;
          this.statustring=`The Oxford Dictionaries API servers are up, but overloaded with requests. Please try again later.`;
        }
        else if(this.st==504)
        {
          this.statusttl="Gateway timeout";
          this.statusres=this.st;
          this.statustring=`The Oxford Dictionaries API servers are up, but the request couldn’t be serviced due to some failure within our stack. Please try again later.`;
        }
        else 
        {
          this.statusres=null;
        }
      }
      else {
        
      }
     
   });
  }

}
