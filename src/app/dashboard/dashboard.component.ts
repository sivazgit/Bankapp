import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  // login username
  user=""

// deposit Model
depositForm = this.fb.group({
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswrd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

// withdarw Model
withdrawForm = this.fb.group({
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswrd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

// acno to child
acno:any

// To display loginDetails

lDate:any


  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    if(localStorage.getItem('currentUsername')){
    // fetch username from localstorage
  this.user=JSON.parse(localStorage.getItem('currentUsername') || '')
    }
  this.lDate = new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('please Login!')
      this.router.navigateByUrl('')
    }
  }

  deposit(){
    var acno=this.depositForm.value.acno
    var pswrd=this.depositForm.value.pswrd
    var amount=this.depositForm.value.amount
    if(this.depositForm.valid){
      // deposit data service - asynchronous
    this.ds.deposit(acno,pswrd,amount)
    .subscribe(
      (result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      })
    }
    else{
      alert('invalid form')
    }
     
  }

  withdraw(){
    var acno=this.withdrawForm.value.acno
    var pswrd=this.withdrawForm.value.pswrd
    var amount=this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
      // withdraw dataservice - asynchronous
      this.ds.withdraw(acno,pswrd,amount)
      .subscribe(
        // 200
        (result:any)=>{
          alert(result.message)
        },
        // 400
        result=>{
          alert(result.error.message)
        })
      }
      else{
        alert('invalid form')
      }
    
  }

  // logout
  logout(){
    // remove login acno,username
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    localStorage.removeItem('token')


    // navigate to login page
    this.router.navigateByUrl('')

  }

  // deleteParent()

  deleteParent(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  // cancel()
  cancel(){
    this.acno=""
  }


  // onDelete($event)
  onDelete(event:any){
    // asynchronous
    this.ds.delete(event)
    .subscribe(
      (result:any)=>{
        alert(result.message)
        // navigate to login page
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
    )
    
  }
}
