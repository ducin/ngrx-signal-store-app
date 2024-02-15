import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from './books.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BooksComponent],
  template: `
    <app-books />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx-signal-store';
}
