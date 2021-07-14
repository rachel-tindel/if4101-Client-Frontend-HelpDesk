import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  client:Client = new Client();
  
  constructor(  private clientService:ClientService) { }

  ngOnInit(): void {
    this.client=this.clientService.client;
  }

}
