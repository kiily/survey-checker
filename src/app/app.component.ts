import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedUser: IUser;
  users: IUser[];
  checkedUsers: string[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe( users => this.users = users);
  }

  onUserSelected(selectedUser: IUser): void {
    this.selectedUser = selectedUser;
  }

  onCheck(): void {
    this.selectedUser = {... this.selectedUser, checked: true};
    this.usersService.setUser(this.selectedUser);
  }

  getCheckedUsers(users: IUser[]): void {
    this.checkedUsers = this.usersService.getCheckedUsers(users);
  }


}
