import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from "primeng/button";

@Component({
  selector: 'app-users',
  imports: [TableModule, Button],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

  users = [
    {
      id: 1,
      first: 'First1',
      last: 'Last1',
      email: 'email@email.com',
      phone: '111111111',
      location: 'location1'
    },
    {
      id: 2,
      first: 'First2',
      last: 'Last2',
      email: 'email2@email.com',
      phone: '222222222',
      location: 'location2'
    },
    {
      id: 3,
      first: 'First3',
      last: 'Last3',
      email: 'email3@email.com',
      phone: '333333333',
      location: 'location3'
    },
  ]

}
