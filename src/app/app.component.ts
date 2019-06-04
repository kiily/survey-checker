import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUser } from '../interfaces/user.interface';
import dayjs from 'dayjs/esm';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  selectedUser: IUser;
  users: IUser[];
  checkedUsers: string[];
  hasConsented = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe( users => {
        return this.users = users.sort();
    });
  }

  //TODO: this is not working
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
    this.selectedUser = {... this.selectedUser, checked: true, date: dayjs().format('DD/MM/YYYY HH:mm:ss')};
    this.usersService.setUser(this.selectedUser);
  }

  getCheckedUsers(users: IUser[]): void {
    this.checkedUsers = this.usersService.getCheckedUsers(users);
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


}
