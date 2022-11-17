import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-newcomp',
  templateUrl: './newcomp.component.html',
  styleUrls: ['./newcomp.component.css']
})
export class NewcompComponent implements OnInit {

  aim = 'Your perfect banking partner'

  account = 'Account number here'

  // To hold user account number
  acno=""

  // To hold password
  pswrd=""
  
  // login Model
  loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswrd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  
  // constructor - 
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  // Ḷife cycle hook - angular
  ngOnInit(): void {
  }

  // user defined function



  // login()

  login(){
    var acno = this.loginForm.value.acno
    var pswrd = this.loginForm.value.pswrd
    if(this.loginForm.valid){
      // calling login - dataservice asynchronous
   this.ds.login(acno,pswrd)
   .subscribe(
    (result:any)=>{
      localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
      localStorage.setItem('token',JSON.stringify(result.token))

     alert(result.message)
     this.router.navigateByUrl("dashboard")
   },
   result=>{
    alert(result.error.message)
   }
   )
   
  }
    else{
      alert('invalid form')
    }
        
  }


}