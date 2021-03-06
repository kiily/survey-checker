import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUser } from '../interfaces/user.interface';
import dayjs from 'dayjs/esm';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedUser: IUser;
  users: IUser[];
  checkedUsers: IUser[];
  hasConsented = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe( users => {
        this.checkedUsers = this.getCheckedUsers(users)
        return this.users = users.sort(this.sortByName);
    });
  }

  sortByName(user1, user2) {
    const name1 = user1.name.toUpperCase();
    const name2 = user2.name.toUpperCase();
    return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
  }

  onUserSelected(selectedUser: IUser): void {
    this.selectedUser = selectedUser;
  }

  onCheck(): void {
    this.selectedUser = {... this.selectedUser, checked: true, date: dayjs().format('DD/MM/YYYY HH:mm:ss')};
    this.usersService.setUser(this.selectedUser);
  }

  getCheckedUsers(users: IUser[]): IUser[] {
    return this.usersService.getCheckedUsers(users);
  }

   handleFile(event) {
    const files = event.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      this.usersService.getUsersFromFile(data);
    };
    reader.readAsArrayBuffer(f);
  }

  getUncheckedUsers(): number {
    return this.users.length - this.getTotalCheckedUsers();
  }

  getTotalCheckedUsers(): number {
    return this.checkedUsers.length;
  }

  exportToExcel() {
    alert(`THERE ARE ${this.getUncheckedUsers()} UNCHECKED USERS`);
    this.usersService.exportUsersToFile(this.checkedUsers);
  }

}
