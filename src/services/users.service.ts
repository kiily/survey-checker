import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IUser } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<IUser[]> {
    return this.db.list<IUser>('users').valueChanges();
  }

  setUser(user: IUser) {
    const usersRef = this.db.list('users');
    usersRef.update(`${user.id}`, { checked: user.checked});
  }
}
