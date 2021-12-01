import { Component, OnInit, Output } from '@angular/core';
import { max } from 'rxjs';
import { ActionLog, Book, BookStatus } from '../book';
import { BookService } from '../book.service';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];   
  isNew: boolean = false;
  actionLog: ActionLog | undefined;

  constructor(
    private bookService: BookService,
    private borrowService: BorrowService
    ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books.slice(0, 10));
  }

  toggle(id: number, status: number): void {
    //let selectedBook = this.books.find(e => e.id === id);
    var actionLogs = this.borrowService.actionLogs.filter(x => x.bookId == id);
    var logId = Math.max.apply(Math, actionLogs.map(function(x) {return x.id;}))
    for (var i in this.books) {
      if (this.books[i].id == id) {
        switch(status) {
          case BookStatus.InStore:
            this.books[i].status = BookStatus.Borrowed;
            this.actionLog = new ActionLog(isFinite(logId)? (logId + 1) : 1, id, 'Borrow', new Date());
            this.borrowService.add(this.actionLog);
            break;
          case BookStatus.Borrowed:
            this.books[i].status = BookStatus.InStore;
            this.actionLog = new ActionLog(isFinite(logId)? (logId + 1) : 1, id, 'Return', new Date());
            this.borrowService.add(this.actionLog);
            break;
          default:
            return;
        }
        
      }
    }
  }

  showStatus(eStatus: number): string {
    switch(eStatus) {
      case BookStatus.InStore:
        return "Borrow";
      case BookStatus.Borrowed:
        return "Return";
      default:
        return "Unavailable";
    }
  }

  add(isNew: boolean): void {
    this.isNew = !isNew;
  }
}
