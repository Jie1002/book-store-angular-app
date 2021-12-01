import { Injectable } from '@angular/core';
import { Book, BookStatus, ActionLog } from './book';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  actionLogs:  ActionLog[] = [];

  add(actionLog: ActionLog) {
    this.actionLogs.push(actionLog);
  }
  
  showBorrowLogById(id: number) {
    var borrowLogs =  this.actionLogs.filter(el => (el.action.toUpperCase() == 'BORROW'))
    return borrowLogs.filter(x => x.bookId == id);
  }

  showReturnLogById(id: number) {
    var borrowLogs =  this.actionLogs.filter(el => (el.action.toUpperCase() == 'RETURN'))
    return borrowLogs.filter(x => x.bookId == id);
  }
}
