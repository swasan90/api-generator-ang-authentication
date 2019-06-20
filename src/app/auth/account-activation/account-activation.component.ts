import { ResponseMessage } from 'app/models/response-message';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountActivateService } from './account-activate.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css'],
  providers:[AccountActivateService]
})
export class AccountActivationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private accountactivationService:AccountActivateService) { }

  param1:String;
  response:ResponseMessage;
  error:any;
  isError:boolean;
  message:String;
  isSuccess:boolean;

  activateAccount(){
    this.accountactivationService.activateUser(this.param1).subscribe(data=>{   
      this.isSuccess =false;   
      this.message = data.message; 
    },error=>{
        this.isError=true;
        this.message = error.error.message;
    })
  }

  ngOnInit() {
     this.route.queryParams.subscribe(params=>{
        this.param1 = params['token'];        
     });
     this.activateAccount();
     
  }

}
