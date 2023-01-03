import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalBookComponent } from '../modals/modal-book/modal-book.component';
import { BookResponseDto } from '../models/dto-response/book-response-dto';
import { BookService } from '../service/book-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{

  public listBookResponse : BookResponseDto[] = [];

  private subscription: Subscription = new Subscription();


  constructor(private bookService: BookService,
    private modalService: NgbModal) { }
  

  ngOnInit(): void {

    this.findAllBook();

     // Add una subcription
     this.subscription.add(
      
      this.bookService.refresh.subscribe( item=>{
        this.findAllBook();

      })
    );

  }
  ngOnDestroy(): void {
  
    this.subscription.unsubscribe();
  }

  findAllBook(){

    this.bookService.findAllBook().subscribe(response =>{
      this.listBookResponse = response.data;
    });
  }

  openModal(){
    this.modalService.open(ModalBookComponent, { size: 'lg' });
  }

  deleteBook(ide:number){


    this.bookService.deleteBook(ide).subscribe(resp =>{

       console.log("Book deleted");
    },
    error =>{
      console.log(error);
    });
  
}
openModalUpdate(ide:number){


   const  references = this.modalService.open(ModalBookComponent, {size: 'lg'});
   references.componentInstance.ideBookUpdate= ide;
}

}
