import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { BOOKS } from './mock-books';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'https://localhost:7294/api/Books';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  getBooks(): Observable<Book[]> {
    const books = of(BOOKS);
    this.messageService.add('BookService: fetch books');
    return books;
    // return this.http.get<Book[]>(this.booksUrl)
    // .pipe(
    //   tap(_ => this.log('fetched all books')),
    //   catchError(this.handleError<Book[]>('getBooks', []))
    // );
  }

  getBook(id: number): Observable<Book> {
    const book = BOOKS.find(b => b.id === id)!;
    this.messageService.add(`BookService: fetch book id=${id}`);
    return of(book);
  //   const url = `${this.booksUrl}/${id}`;
  //   return this.http.get<Book>(url)
  //   .pipe(
  //     tap(_=>this.log(`fetched book id=${id}`)),
  //     catchError(this.handleError<Book>(`get book id=${id}`))
  //  );
  }

  updateBook(book: Book): Observable<any> {
    const url = `${this.booksUrl}/${book.id}`;
    return this.http.put(url, book, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>(`updateBook id=${book.id}`))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions)
    .pipe(
      tap((newBook: Book) => this.log(`added book id= ${newBook.id}`)),
      catchError(this.handleError<Book>('add book'))
    );
  }

  deleteBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions)
    .pipe(
      tap(_=> this.log(`delete book id=${id}`)),
      catchError(this.handleError<Book>('delete book'))
    );
  }

  private log(message: string) {
    this.messageService.add(`bookService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
