import { Injectable } from '@angular/core';
import { Book } from './book';
import { BOOKS } from './mock-books';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private messageService: MessageService) { }

  getBooks(): Observable<Book[]> {
    const books = of(BOOKS);
    this.messageService.add('BookService: fetch books');
    return books;
  }

  getBook(id: number): Observable<Book> {
    const book = BOOKS.find(b => b.id === id)!;
    this.messageService.add(`BookService: fetch book id=${id}`);
    return of(book);
  }
}
