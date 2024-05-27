import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {}
  page = 0
  size = 5
  message = "";
  level = 'success'

  constructor(
    private bookService: BookService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findAllBooks({ page: this.page, size: this.size }).subscribe({
      next: (books) => {
        this.bookResponse = books
      }
    })
  }

  goToFirstPage(){
    this.page = 0
    this.findAllBooks();
  }

  goToPreviousPage(){
    this.page--
    this.findAllBooks();
  }

  goToPage(pageIndex:number){
    this.page = pageIndex
    this.findAllBooks();
  }

  goToNextPage(){
    this.page++
    this.findAllBooks();
  }

  goToLastPage(){
    this.page = this.bookResponse.totalPages as number - 1
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1
  }

  borrowBook(book:BookResponse){
    this.message=""
    this.bookService.borrowBook({ 'book-id': book.id as number }).subscribe({
      next: () => {
        this.level = 'success'
        this.message = "Book successfully added to your List"
      },
      error: (err) => {
        console.log(err)
        this.level = 'error'
        this.message = err.error.error
      }
    })
  }

}
