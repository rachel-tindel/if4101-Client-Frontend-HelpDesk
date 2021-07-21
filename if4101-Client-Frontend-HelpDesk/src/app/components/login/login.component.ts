import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { UpperCasePipe } from '@angular/common';
import { style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  client:Client = new Client();

  public loginForm = this.fb.group({
    email : ['',[ Validators.required, Validators.email]],
    password : ['',[ Validators.required, Validators.minLength(8)]],
  });

  constructor(  private fb:FormBuilder,
                private router:Router,
                private clientService:ClientService) { }

  ngOnInit(): void {
  }

  valueNoValid(value:string) {
    return this.loginForm.get(value).invalid && this.loginForm.get(value).touched
  }

  loginUser(){

     if(this.loginForm.invalid){
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      email.classList.add("is-invalid");
      password.classList.add("is-invalid");
      return;
    }

    this.clientService.login(this.loginForm.value)
    .subscribe( client =>{
       if(client)   {
        this.client = client;
        this.modal('/home','Help-Desk TeleAtlántico');
       }else{
        this.modal('','Error al autentificar')
       }
    });
  }

  modal( url:string | '', cargando:String){
    let timerInterval
        Swal.fire({
        title: cargando,
        background: '#8cfffb',
        html: '',
        timer: 1000,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 50)
        },
        willClose: () => {
        clearInterval(timerInterval)
        }
        }).then((result) => {
          
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl(url);
          }
        })
  }

}
