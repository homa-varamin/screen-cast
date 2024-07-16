import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonitorService } from './services/monitor.service';

@Component({
  selector: 'app-screen-cast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-cast.component.html',
})
export class ScreenCastComponentimplements {
  streamUrl: string | null = null;

  constructor(public monitorService: MonitorService) {}

  startStream(monitorId: string): void {
    this.monitorService.startStream(monitorId).subscribe((data) => {
      this.streamUrl = data.streamUrl;
    });
  }
}
