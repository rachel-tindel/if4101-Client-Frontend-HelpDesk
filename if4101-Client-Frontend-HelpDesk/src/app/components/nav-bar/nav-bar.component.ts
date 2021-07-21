import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  client:Client;

  constructor(private clientService: ClientService, private router:Router) { }

  ngOnInit(): void {
    this.client = this.clientService.client;
  }

  logout(){
    this.clientService.logout();
    this.router.navigate(['/login']);
  }

}
