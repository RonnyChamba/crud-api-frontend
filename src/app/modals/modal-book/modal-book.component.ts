import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { BookDTO } from 'src/app/models/book';
import { CategoryResponseDTO } from 'src/app/models/dto-response/category-response';
import { BookService } from 'src/app/service/book-service.service';
import { CategoryService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.css']
})
export class ModalBookComponent implements OnInit {

  bookDTO = new BookDTO();

  listCategoryResponse: CategoryResponseDTO[] = [];
  @Input() ideBookUpdate: number;

  constructor(public ngActiveModal: NgbActiveModal,
    private categoryService: CategoryService,
    private bookService: BookService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.initData();
  }

  private initData() {
    this.initValuesBook();
  }

  private initValuesBook() {
    this.bookDTO.pagesNumber = 1;
    this.bookDTO.publicationDate = this.getCurrentDate();
    this.bookDTO.category = -1;
    // console.log(this.bookDTO);
    this.getCategories();

    if (this.ideBookUpdate) {

      this.setDataUpdateBook();
    }
  }


  private setDataUpdateBook() {

    this.bookService.findBookByIde(this.ideBookUpdate).subscribe(resp => {
      this.bookDTO.ide = resp.ide;
      this.bookDTO.title = resp.title;
      this.bookDTO.description = resp.description;
      this.bookDTO.isbn = resp.isbn;
      this.bookDTO.pagesNumber = resp.pagesNumber;
      this.bookDTO.publicationDate = resp.publicationDate;
      this.bookDTO.category = resp.category;

    });

  }

  private getCategories() {


    this.categoryService.findlAllCategory().subscribe(res => {


      this.listCategoryResponse = res.data;

      this.listCategoryResponse.push({
        ide: -1,
        name: "SELECTED CATEGORY",
        description: ""
      });

    });
  }

  clickButtonOperation() {

    let smsValid = this.validBook();

    if (!smsValid) {

      if (this.ideBookUpdate)
        this.updateBook();
      else
        this.saveBook();
    }else console.log(smsValid);

  }
  saveBook() {
    this.bookService.saveBook(this.bookDTO).subscribe(response => {

      this.toastrService.success(`Book save`, '');
      this.ngActiveModal.dismiss();

    }, error => {

      console.log(error);
    });

  }

  private updateBook() {

    this.bookService.updateBook(this.ideBookUpdate, this.bookDTO).subscribe(resp=>{

        console.log("BOOK update");
        this.ngActiveModal.dismiss();

    }, error =>{
      console.log("Error update book", error);
    });


  }


  private validBook() {

    let smsValid = "";
    if (!this.bookDTO.title) {

      smsValid = `Title is required`;
    }

    if (!this.bookDTO.isbn) {

      smsValid = `ISBN is required`;
    }

    if (!this.bookDTO.pagesNumber) {

      smsValid = `Pages Number are required`;
    }

    return smsValid;

  }


  private getCurrentDate(): string {

    let date1 = new Date();
    let currentYear = date1.getUTCFullYear();
    let currentMonth = date1.getUTCMonth() + 1;
    // let currentDay = date1.getUTCDate();
    let currentDay = date1.getDate();


    let FinalMonth: any;
    let FinalDay: any;

    if (currentMonth < 10) {
      FinalMonth = "0" + currentMonth;
    } else {
      FinalMonth = currentMonth;
    }

    if (currentDay < 10) {
      FinalDay = "0" + currentDay;
    } else {
      FinalDay = currentDay;
    }


    return currentYear + "-" + FinalMonth + "-" + FinalDay;

  }

}
