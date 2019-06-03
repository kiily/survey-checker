import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../../classes/user';


@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form-component.component.html',
  styleUrls: ['./user-form-component.component.scss']
})
export class UserFormComponentComponent implements AfterViewInit {

  @ViewChild('userForm', {static: true}) userForm;

  @Input() users: IUser[];

  @Output() userSelected = new EventEmitter<IUser>();

  constructor() {}

  ngAfterViewInit() {
    this.userForm.valueChanges.subscribe(
      (result) => {
        const userId = result.id;
        if (this.users) {
          const selectedUser = this.users.filter(user => user.id == userId)[0];
          this.userSelected.emit(selectedUser);
        }
      }
  );
  }

}
