export class Book {
  constructor (
    public id: number,
    public title: string,
    public author: string,
    public description: string,
    public coverName: string,
    public status: number
    ) {}
  }

export enum BookStatus {
  InStore = 0,
  Borrowed,
  Lost
}

export class ActionLog {
  constructor(
    public id: number,
    public bookId: number,
    public action: string,
    public date: Date
  ){
  }

}