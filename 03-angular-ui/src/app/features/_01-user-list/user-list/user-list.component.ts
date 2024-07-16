import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userList: UserModel[] = [];

  addUser() {
    this.userList.push({ name: '', ip: '' });
  }

  removeUesr(user: UserModel) {
    this.userList = this.userList.filter((x) => x !== user);
  }
}
