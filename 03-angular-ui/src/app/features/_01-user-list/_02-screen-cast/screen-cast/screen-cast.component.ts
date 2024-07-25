import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScreenStreamService } from './services/screen-stream.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-screen-cast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-cast.component.html',
})
export class ScreenCastComponent implements OnDestroy {
  @ViewChild('imagePlayer')
  imagePlayer!: ElementRef<HTMLImageElement>;
  private streamSubscription!: Subscription;
  imageUrl!: string;

  constructor(private screenService: ScreenStreamService) {
    this.startStreaming();
  }

  startStreaming(): void {
    this.streamSubscription = this.screenService.streamScreenImage().subscribe(
      (imageBlob: Blob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        this.imageUrl = imageUrl;
        this.imagePlayer.nativeElement.src = imageUrl;
      },
      (error) => {
        console.error('Error streaming screen image:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.streamSubscription) {
      this.streamSubscription.unsubscribe();
    }
  }
}
