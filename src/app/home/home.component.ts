import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ReqservicesService} from '../reqservices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[Location]
})
export class HomeComponent implements OnInit {
public token:any;
public ref:number=1;
public listshow:boolean=false;
public details:any={};
  constructor(public _route:ActivatedRoute,public router:Router,public reqservice:ReqservicesService,public toastr:ToastrService,
    public location:Location){
    
  }

  public login(t):any {
    this.reqservice.login(t).subscribe(
      data =>{
        this.toastr.success("You are successfully logged in :)");
        //console.log(data);
        this.details = data;
        console.log(this.details);
        this.starred(t);
        this.repos(t);
        this.gist(t);
        this.followers(t);
        this.followings(this.details.login);
      },
      error=>{
        console.log("Error");
        console.log(error.status);
        this.router.navigate(['/err'],{ queryParams: {e: error.status } });
      }
      
    )
  }

public reposarray:any=[];
public repos(r):any {
  this.reqservice.repos(r).subscribe(
    data=>{
      this.reposarray=data;
      //console.log(this.reposarray);
      console.log(this.reposarray.length);
      for(let i of this.reposarray){
        //console.log(i.full_name);
      }
    },
    error=>{
      console.log("Error");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public sarray:any=[];
public sl:any;
public starred(s):any {
  this.reqservice.starred(s).subscribe(
    data=>{
      console.log(data);
      this.sarray = data;
      console.log(this.sarray.length);
      this.sl=this.sarray.length;
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public contact() {
  window.open('mailto:chauhanurmi2@gmail.com');

}

public opengist(n) {
  window.open(n);
}
public gotorepo(url){
  window.open(url);
}

public g:any=[];
public gname=[];
public gist(t) {
  this.reqservice.gist(t).subscribe(
    data=>{
      this.g = data;
      for(let i of this.g){
        console.log(i.files);
        for(let f in i.files){
          console.log(i.files[f].filename);
          this.gname.push({"name":i.files[f].filename,"link":i.html_url});
        }
      }
      console.log(this.gname);
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
        this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public nouser:boolean=false;
public userlist:any=[];
public searchuser(usr) {
  this.listshow = !this.listshow;
  this.reqservice.searchuser(usr).subscribe(
    data=>{
      this.userlist=data;
      console.log(this.userlist.items);
      if(this.userlist.items.length==0){
        this.nouser = !this.nouser;
        console.log(this.userlist.items);
      }
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public gotoprofile(ppl) {
  console.log(ppl);
  this.router.navigate(['/people'],{ queryParams: {ul:ppl} });

}

public u1:any;
public showlist(u) {
  this.listshow = !this.listshow;
  this.u1=u;
}

public f:any=[];
public followers(f) {
  this.reqservice.followers(f).subscribe(
    data=>{
      this.f=data;
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public d:any=[];
public feedarray:any=[];
public feed() {
  this.reqservice.feed().subscribe(
    data=>{
      this.d=data;
      for(let j of this.d){
        if(j.org!=undefined){
          console.log(j);
          this.feedarray.push(j);
        }
      }
      console.log(this.feedarray);
      console.log(this.feedarray[1].type);
      console.log(`Created by: ${this.feedarray[4].actor.login}`);
      console.log(this.feedarray[0].actor.avatar_url);
      
    },
    error=> {
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public fw:any=[];
public followings(n) {
  this.reqservice.followings(n).subscribe(
    data=>{
      this.fw=data;
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public logout() {
  if(localStorage.getItem('mytoken')){
    localStorage.removeItem('mytoken');
    console.log(localStorage.getItem('mytoken'));
    this.toastr.success("You are log out from the GITAPP");
    this.router.navigate(['/login']);
  }  
  
}

  ngOnInit() {
    this.feed();
    //this.searchuser(this.u1);
    console.log(localStorage.getItem('mytoken'));

    /* this._route.queryParams.subscribe((params: Params) => {
       console.log(params.t);
       localStorage.setItem('mytoken',params.t);
   }); */

   console.log(localStorage.getItem('mytoken'));
       this.token=localStorage.getItem('mytoken');
       this.login(this.token);
       
  }

}
