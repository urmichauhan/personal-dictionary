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
  selector: 'app-fullview',
  templateUrl: './fullview.component.html',
  styleUrls: ['./fullview.component.css']
})
export class FullviewComponent implements OnInit {
public ant:any;
public adjshsub:boolean=false;
public adjsh:boolean=false;
public showex:boolean=false;
public showexn:boolean=false;
public ver:boolean=false;
public wordtosearch:any;
public listselected:any;
public a:any;
public meanings:any;
public m:any=[];
public e:any;
public antonyms:any;
public synonyms:any;
public verb:any=[];
public noun:any=[];
public adjective:any=[];
public adverb:any=[];
public hideme:any={};
public mean:any=[];
public meanexa:any=[];
public def:any;
public shortdef:any=[];
public origin:any=[];
public finor:any=[];
public synonymlist:any=[];
public antonymlist:any=[];
  constructor(public _route:ActivatedRoute,public router:Router,public searchword:SearchwordService,private location:Location,
    private toastr:ToastrService, vcr: ViewContainerRef) { }

    
 public alldetails(wd):any {
  this.searchword.alldetails(wd).subscribe(
     data =>{
         console.log(wd);
         console.log(data);
         for(let i of data.results){
          console.log(i.lexicalEntries);
          //adverb,verb,noun,adjective
          for(let j=0;j<i.lexicalEntries.length;j++)
          {
            console.log(i.lexicalEntries[j]);
            for(let or=0;or<i.lexicalEntries[j].entries.length;or++)
            {
              this.origin.push(i.lexicalEntries[j].entries[or]);
              for(let org=0;org<1;org++)
              {
                console.log(this.origin[org].etymologies);
                this.finor=this.origin[org].etymologies;
              }
            }
            if(i.lexicalEntries[j].lexicalCategory=="Adjective")
            {
              console.log(`Adjective of ${wd} :`);
              this.adjective.push(i.lexicalEntries[j]);
              console.log(i.lexicalEntries[j]);
            }
            if(i.lexicalEntries[j].lexicalCategory=="Adverb")
            {
              this.adverb.push(i.lexicalEntries[j]);
              console.log(`Adverb of ${wd} : ${i.lexicalEntries[j].text}`);
            }
            if(i.lexicalEntries[j].lexicalCategory=="Verb")
            {
              console.log(`Verb of ${wd} : ${i.lexicalEntries[j].text}`);
              this.verb.push(i.lexicalEntries[j]);
            }
            if(i.lexicalEntries[j].lexicalCategory=="Noun")
            {
              console.log(`Noun of ${wd} : ${i.lexicalEntries[j].text}`);
              this.noun = i.lexicalEntries[j].text;
            }
          }
          //meanings
          for(let k=0;k<i.lexicalEntries.length;k++)
          {
            console.log(i.lexicalEntries[k].entries);
            this.meanings = i.lexicalEntries[k].entries;
            console.log(this.meanings);
            for(let o=0;o<this.meanings.length;o++)
            {
              console.log(this.meanings[o].senses);
              this.m.push(this.meanings[o].senses);
              
              //meanings
              console.log(this.m);
              for(let p=0;p<this.m.length;p++)
              {
                if(this.m[p].definitions!=undefined)
                {
                  for(let u=0;u<this.m[p].definitions.length;u++)
                  {
                    console.log(this.m[p].definitions[u]);
                  }
                }
                if(this.m[p].examples!=undefined)
                {
                    this.e = this.m[p].examples;
                    for(let q=0;q<this.e.length;q++)
                    {
                      console.log(this.e[q].text);
                      this.meanexa.push(this.e[q].text)
                    }
                }
                console.log(this.m[p].short_definitions);
                this.shortdef.push(this.m[p].short_definitions);
              }
              
            }
          }
          
        }
     }, 
     error => {
         console.log("Error");
         console.log(error.errorMessage);
         this.router.navigate(['errhandle'],{ queryParams: {e: error.status } });

         console.log(error.status);
         
     }
 )  
}

//phrases after
public pm:any=[];
public phrasearray:any=[];
public pmeanings:any=[];
public callphrases(wd):any {
  this.searchword.callphrases(wd).subscribe(
     data =>{
         console.log(wd);
         console.log(data);
         for(let i of data.results){
           if(wd==i.word)
           {
             console.log("native word");
           }
           else
           {
            this.phrasearray.push(i.word)
           }
         }
         for(let p of this.phrasearray)
         {
            console.log(p);
            this.allphrases(p);
        
         }
         
     }, 
     error => {
         console.log("Error");
         console.log(error.errorMessage);
     }
 )  
}
//display details of phrases
public objarray=[];
public finph:any=[];
public pdef:any=[];
public allphrases(wp):any {
  this.searchword.allphrases(wp).subscribe(
     data =>{
         console.log(wp);
            for(let pi of data.results){
              console.log(pi.word);
              this.finph.push(pi.word);
              //meanings
            for(let pk=0;pk<1;pk++)
            {
              console.log(pi.lexicalEntries[pk].entries);
              this.pmeanings = pi.lexicalEntries[pk].entries;
              
              for(let po=0;po<1;po++)
              {
                console.log(this.pmeanings[po].senses);
                let pmm =this.pmeanings[po].senses;
                
                //meanings
                console.log(pmm);
                for(let pool=0;pool<1;pool++)
                {
                  console.log(pmm[pool]);
                  for(let lt=0;lt<1;lt++)
                  {
                    this.pdef.push(pmm[0].definitions);
                  }
                  
                  //console.log(this.pm[pool]);
                }
                
              }
            }
            
          }
         
     }, 
     error => {
         console.log("Error");
         console.log(error);
     }
 )  
}





//synonyms and antonyms
public synm(wd):any {
  this.searchword.synm(wd).subscribe(
     data =>{
       this.wordtosearch = wd;
         console.log(data);

         for(let i of data.results){
          console.log(i.lexicalEntries); 
        
              for(let k=0;k<i.lexicalEntries.length;k++)
              {
                console.log(i.lexicalEntries[k].entries);
                this.ant = i.lexicalEntries[k].entries;
                console.log(this.ant);
                for(let o=0;o<this.ant.length;o++)
                {
                  console.log(this.ant[o].senses);
                  for(let p=0;p<this.ant[o].senses.length;p++)
                  {
                    //ANTONYMS
                    if(this.ant[o].senses[p].antonyms!=null && this.ant[o].senses[p].antonyms!=undefined)
                    {
                      this.antonyms=this.ant[o].senses[p].antonyms;
                      for(let q=0;q<this.antonyms.length;q++)
                      {
                        this.antonymlist.push(this.antonyms[q].text);
                        console.log(`ANTONYMS : ${this.antonyms[q].text}`);
                      }
                    }
                    else
                    {
                      console.log("not found");
                      //this.toastr.error("ANTONYMS not found");
                    }
                     
                    //SYNONYMS
                    if(this.ant[o].senses[p].subsenses!=null && this.ant[o].senses[p].subsenses!=undefined)
                    {
                        this.synonyms=this.ant[o].senses[p].subsenses;
                       
                        for(let s=0;s<this.synonyms.length;s++)
                        {      
                          for(let t=0;t<this.synonyms[s].synonyms.length;t++)
                          {
                            console.log(`SYNONYMS : ${this.synonyms[s].synonyms[t].text}`);
                            this.synonymlist.push(this.synonyms[s].synonyms[t].text)
                          }
                        }
                    } 
                    else
                    {
                      console.log("not found");
                      //this.toastr.error("SYNONYMS not found");
                    }
                  
                  }
                }
                
              }
            }    

     }, 
     error => {
         console.log("Error");
         console.log(error.errorMessage);
     }
 )
 
}

//meaning show
public sh(item) {
  
  this.showex = !this.showex;
  this.toastr.info("View examples ");
}

public shn(it) {
  this.showexn = !this.showexn;
  this.toastr.info("View examples ");
}


//adjectiveshow
public showadj(){
  this.adjsh = !this.adjsh;
}

public showadjsub(){
  this.adjshsub = !this.adjshsub;
}

public showverb(){
  this.ver = !this.ver;
}


public v:boolean=false;
public finalphrasesmathod() {
  this.v = !this.v;
  console.log(this.pdef);
  for(let keyp=0,valp=0;keyp<this.finph.length && valp<this.pdef.length;keyp++,valp++)
    {
      this.objarray.push({phrasename:this.finph[keyp],phrasedef:this.pdef[valp]});
    }
    console.log(this.objarray);
}


    ngOnInit() {

     console.log("full view works");
      this.toastr.success("See Your results with all details");
     this._route.queryParams.subscribe((params: Params) => {
       if(params.sname!=undefined)
       {
        console.log(params.sname);
        this.wordtosearch=params.sname;
        console.log(this.wordtosearch);
        this.alldetails(this.wordtosearch);
        this.synm(this.wordtosearch);
        
        this.callphrases(this.wordtosearch);
       }
       else if(params.wrd!=undefined)
       {
        console.log(params.wrd);
        this.wordtosearch=params.wrd;
        console.log(this.wordtosearch);
        this.alldetails(this.wordtosearch);
        this.synm(this.wordtosearch);
        this.callphrases(this.wordtosearch);
       
       }
       else {
         console.log("No such request");
       }
      
    });

    
    
   

  }
}
