import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  selectedUser: IUser;
  users: IUser[];
  checkedUsers: string[];
  hasConsented: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe( users => {
        return this.users = users;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.users) {
      const users = this.users;
      this.getCheckedUsers(users);
    }
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
