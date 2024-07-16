import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
import { FormsModule } from '@angular/forms';
import { ScreenStreamService } from '../_02-screen-cast/screen-cast/services/screen-stream.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userList: UserModel[] = [{ name: '', ip: 'localhost'/* '192.168.137.1' */ }];

  constructor(private streamService: ScreenStreamService) {
    (window as any).userListComponent = this;
  }

  addUser() {
    this.userList.push({ name: '', ip: '' });
  }

  removeUesr(user: UserModel) {
    this.userList = this.userList.filter((x) => x !== user);
  }

  onWatch(user: UserModel) {
    this.streamService.setIP(user.ip);
  }
}
