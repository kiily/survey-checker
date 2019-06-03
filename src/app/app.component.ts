import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { IUser } from '../classes/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedUser: IUser;
  users: IUser[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe( users => this.users = users);
  }

  onUserSelected(selectedUser: IUser) {
    this.selectedUser = selectedUser;
  }

  onCheck() {
    this.selectedUser = {... this.selectedUser, checked: true};
    this.usersService.setUser(this.selectedUser);
  }
}
