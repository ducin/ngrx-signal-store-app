import { Component, inject, ChangeDetectionStrategy, effect, model, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksStore } from './books.store';
import { getState } from '@ngrx/signals';







import { withToggle } from 'sygnalyze';
import { immutablePatchState } from 'sygnalyze/ngrx'






@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BooksStore],
  imports: [JsonPipe, FormsModule],
  template: `
    <!-- <p>Books: {{ store.books() | json }}</p>
    <p>Loading: {{ store.isLoading() }}</p>
    <p>Pagination: {{ store.filter() | json }}</p>
    <p>Query: {{ store.filter.query() }}</p> -->
    {{ orderAsc() }}
    <p>
        <input type="checkbox" [checked]="store.filter.order() == 'asc'" (change)="updateOrder($event)" />
        Order: {{ store.filter.order() }}
    </p>

    <h2>books</h2>
    @for (book of store.sortedBooks(); track book.id){
        <li>
            {{book.title}}, {{book.author}}
        </li>
    }
  `
})
export class BooksComponent {
  orderAsc = withToggle(signal(true))
  method(){
    this.orderAsc.toggle()
  }

  readonly store = inject(BooksStore);

  updateOrder(event: Event){
    const checked = (event.target as HTMLInputElement).checked
    this.store.updateOrder(checked ? 'asc' : 'desc');
  }

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('books state changed', state);
    });
  }
}
