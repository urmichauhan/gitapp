import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import {ReqservicesService} from './reqservices.service'
import {NgModel} from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ToastContainerDirective, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'app';
  constructor(public _route:ActivatedRoute,public router:Router,private location:Location,public reqservice:ReqservicesService,public toastr:ToastrService){
    
  }

  /* public login(t):any {
    this.reqservice.login(t).subscribe(
      data =>{
       console.log(data);
      },
      error=>{
        console.log("Error");
        console.log(error.status);
            
      }
      
    )
  } */

  ngOnInit() {
    /* this.toastr.info("Welcome",'GITAPP',{
      timeOut: 6000
    });
   this.login("token 34ae9005e6f237e96fa333e086ef17f136984c14");
   this.toastr.warning("Please Enter token of your GITHUB Account.");
 */
  }
}
