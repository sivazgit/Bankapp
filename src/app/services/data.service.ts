import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// global headers
const options = {
  headers : new HttpHeaders()
  
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http:HttpClient) { 
    
  }

  // register()
  register(acno:any,password:any,username:any){
    // req body
    const data = {
      acno, password, username
    }
    // register api - asynchronous
   return this.http.post('http://localhost:3000/register',data)
  }


  // login()

  login(acno:any,pswrd:any){
    
    // req body
    const data = {
      acno, pswrd
    }
    // login api - asynchronous
   return this.http.post('http://localhost:3000/login',data)

  }

  // to get headers with token
  getOptions(){
    // fetch the token from localstorage
    const token = JSON.parse(localStorage.getItem('token') || '')

    // to get the header , create an object for httpHeaders
    let headers = new HttpHeaders()
    

    // append token inside the header
    if(token){
     headers = headers.append('x-access-token',token)
    //  implement overloaded
     options.headers=headers
    }
    return options
  }

  // DEPOSIT

  deposit(acno:any,pswrd:any,amt:any){
    // req body
    const data = {
      acno, pswrd , amt
    }
    // deposit api - asynchronous
   return this.http.post('http://localhost:3000/deposit',data,this.getOptions())


  }

  // WITHDRAW

  withdraw(acno:any,pswrd:any,amt:any){
    // req body
    const data = {
      acno, pswrd , amt
    }
    // withdraw api - asynchronous
   return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

  }

  // TRANSACTION
  getTransaction(acno:any){
   // req body
   const data = {
    acno
  }
  // transaction api - asynchronous
 return this.http.post('http://localhost:3000/transaction',data,this.getOptions())


  }

  // delete api - asynchronous
  delete(acno:any){
  return this.http.delete('http://localhost:3000/onDelete/'+acno)
  }

  }

