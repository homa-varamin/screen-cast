import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './features/_01-user-list/user-list/user-list.component';
import { ScreenCastComponent } from './features/_01-user-list/_02-screen-cast/screen-cast/screen-cast.component';
import { ScreenStreamService } from './features/_01-user-list/_02-screen-cast/screen-cast/services/screen-stream.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UserListComponent, ScreenCastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'screen-cast-angular';

  constructor(public streamService: ScreenStreamService) {}
}
