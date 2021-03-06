import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../interfaces/user.interface';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<IUser[]> {
    const usersRef = this.db.list<IUser>('users');
    return this.db.list<IUser>('users').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  getUserSnapshots() {
    return this.db.list<IUser>('users').snapshotChanges();
  }

  setUser(user: IUser): void {
    const usersRef = this.db.list('users');
    usersRef.update(`${user.key}`, { checked: user.checked, date: user.date});
  }

  getCheckedUsers(users: IUser[]): IUser[] {
    return users.reduce( (arr, user) => {
      if (user.checked) {
        arr.push(user);
      }
      return arr;
    }, []);
  }

  getUsersFromFile(data: any) {
    const workbook = XLSX.read(data, {type: 'array'});
    const json = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
    for (const user of json) {
      this.db.list<IUser>('users').push({
        name: (user as any).Name,
        checked: false
      });
    }
  }

  exportUsersToFile(checkedUsers: IUser[]) {
    const worksheet = XLSX.utils.json_to_sheet(checkedUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Names');
    XLSX.writeFile(workbook, 'consented_users.xlsx');
  }
}
