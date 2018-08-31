import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {ReqservicesService} from '../reqservices.service'
import {NgModel} from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public hidetext:boolean=true;
public details:any={};
public tokencopy:any;
public finaltoken:any;
public incorrectuser:boolean=false;
public correctuser:boolean=false;
  constructor(public _route:ActivatedRoute,public router:Router,public reqservice:ReqservicesService,public toastr:ToastrService){
    
  }
  public login(t):any {
    this.reqservice.login(t).subscribe(
      data =>{
       console.log(data);
       this.finaltoken=t;
        this.details=data;
        if(this.details.login!=undefined){
          this.correctuser = !this.correctuser;
          this.incorrectuser=false;
          console.log(this.details.login); 
        }
      },
      error=>{
        console.log("Error");
        console.log(error.status);
        if(error.status==401){
          this.incorrectuser = !this.incorrectuser;
          this.toastr.error("You are UNAUTHORIZED user!");
          this.toastr.info("Please Create Token from below link.");
        }
        else {
          this.router.navigate(['/err'],{ queryParams: {e: error.status } });
        }
            
      }
      
    )
  }

public wronguser(u) {
  this.toastr.error(`Sorry We are unable to access your account !:(`);
}

public hidetextevent(val) {
  if(val!=undefined && val!=null && val!=""){
    this.hidetext = !this.hidetext;
  }
}
public checkuser(token) {
  if(token!=undefined && token!=null && token!="") {

    if(token===localStorage.getItem("mytoken")){
      this.toastr.show("You are already logged in !");
      this.router.navigate(['/home']);
      window.location.reload();
    }
    else {
      console.log(this.tokencopy);
      this.login(token);
      this.tokencopy=token;
    }
   
   }
}

public gotohome() {
    this.router.navigate(['/home']);
    localStorage.setItem('mytoken',this.finaltoken);
    window.location.reload();
}

  ngOnInit() {
    this.toastr.info("Welcome",'GITAPP',{
      timeOut: 3000
    });
  }
}
