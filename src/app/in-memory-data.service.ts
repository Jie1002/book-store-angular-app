import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books: Book[] = [
      { id: 11, title: 'Dr Nice', author: 'Dynama', coverName: 'image', description: '', status: 0 },
      { id: 12, title: 'Narco', author: 'Dynama', coverName: 'image', description: '', status: 1  },
      { id: 13, title: 'Bombasto', author: 'Dynama', coverName: 'image', description: '', status: 2  },
      { id: 14, title: 'Celeritas', author: 'Dynama', coverName: 'image', description: '', status: 2  },
      { id: 15, title: 'Magneta' , author: 'Dynama', coverName: 'image', description: '', status: 0 },
    ];
    return {books};
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}
