import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'screen-cast-angular';
  imageUrl!: string | undefined;

  constructor(private http: HttpClient, private chREf: ChangeDetectorRef) {}

  onClick() {
    fetch('http://localhost:3000/capture')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        // Handle errors as needed
      })
      .finally(() => {
        // Optional: Perform cleanup or set default image URL
        this.imageUrl = 'http://localhost:3000/capture.jpg';
      });
  }
}
