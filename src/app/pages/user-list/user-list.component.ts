// src/app/components/user-list/user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  name = localStorage.getItem('name');
  constructor(private userService: UserService,private router: Router) {}
  ngOnInit(): void {
    this.userService.getUsers().then((result: any) => {
      if (result.status = 'SUCCESS') {
        this.users = result.list;
      }else{
        alert(result.message);
      }
    });
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
