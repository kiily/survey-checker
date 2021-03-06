import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../../interfaces/user.interface';


@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form-component.component.html',
  styleUrls: ['./user-form-component.component.scss']
})
export class UserFormComponentComponent implements AfterViewInit {

  @ViewChild('userForm', {static: true}) userForm;

  @Input() users: IUser[];

  @Output() userSelected = new EventEmitter<IUser>();

  selectedUser: IUser;

  constructor() {}

  ngAfterViewInit() {
    this.userForm.valueChanges.subscribe(
      (result) => {
        const userId = result.id;
        if (this.users) {
          this.selectedUser = this.users.filter(user => user.key == userId)[0];
          this.userSelected.emit(this.selectedUser);
        }
      }
  );
  }

}
