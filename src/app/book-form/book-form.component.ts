import { Component, OnInit } from '@angular/core';

import { Book, BookStatus } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book = new Book(
    18, "New book title", "Test Author", "","default",0);

  submitted = false;

  onSubmit() { this.submitted = true;}
  constructor() { }

  ngOnInit(): void {
  }


}
