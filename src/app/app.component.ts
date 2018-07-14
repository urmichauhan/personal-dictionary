import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {SearchwordService} from './searchword.service';
import {NgModel} from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[Location]
})
export class AppComponent implements OnInit {
  public show:boolean = false;
  title = 'Personal Dictionary';
  public wordlist:any=[];
  public wordtosearch:any;
  public fv="/fullview";
  public app="/app";
  constructor(public _route:ActivatedRoute,public router:Router,private location:Location,public toastr:ToastrService,public searchword:SearchwordService){
    
      this.toastr.success("Get Quick Solution !");
  }

  public goback() {
    //window.history.back();
    this.location.back();
    console.log("Back");
    this.toastr.info("Back");
  }  
  public autocomplete(wd):any {
     this.searchword.autocomplete(wd).subscribe(
        data =>{
          this.wordtosearch = wd;
            console.log(this.wordtosearch);

          //console.log(data);
            for(let i of data.results){
      
              if(i.word.length >= 3){
                this.show = !this.show;
                console.log(i.word);
                this.wordlist.push(i.word);
              }
              
            }
            console.log(this.wordlist); 
            if(wd==null && wd==undefined && wd=="" && wd==" " && wd=="  ")
            {
              this.wordlist=null;
              this.toastr.warning("Please fill word properly");
            }
            console.log(this.wordlist);
        }, 
        error => {
            console.log("Error");
            console.log(error.status);
            this.router.navigate(['errhandle'],{ queryParams: {e: error.status } });
        }
    )
    
}
fullviewfromlist(wdselected) {
  this.router.navigate(['fullview'],{ queryParams: {wrd:wdselected } });
}
public fullview() {
  this.show = !this.show;
  this.router.navigate(['fullview'],{ queryParams: {wrd: this.wordtosearch } });
}

public cleartext(text) {
  text = null;
}

  ngOnInit() {

  }


}
