import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<IUser[]> {
    return this.db.list<IUser>('users').valueChanges();
  }

  setUser(user: IUser): void {
    const usersRef = this.db.list('users');
    usersRef.update(`${user.id}`, { checked: user.checked});
  }

  getCheckedUsers(users: IUser[]): string[] {
    return users.reduce( (arr, user) => {
      if (user.checked) {
        arr.push(user.name);
      }
      return arr;
    }, []);
  }
}
