import { Component, Input, OnInit } from '@angular/core';
import { Book, BookStatus, ActionLog } from '../book';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
 @Input() bookId: number = 0;
 BorrowLogs: ActionLog[] = [];
 ReturnLogs: ActionLog[] = [];

  constructor(private borrowService: BorrowService) { }

  ngOnInit(): void {
    this.getBorrowLog(this.bookId);
    this.getReturnLog(this.bookId);
  }

  getBorrowLog(bookId: number) {
    this.BorrowLogs = this.borrowService.showBorrowLogById(bookId);
  }

  getReturnLog(bookId: number) {
    this.ReturnLogs = this.borrowService.showReturnLogById(bookId);
  }
}
