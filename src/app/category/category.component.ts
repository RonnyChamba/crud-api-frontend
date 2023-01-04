import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalCategoryComponent } from '../modals/modal-category/modal-category.component';
import { CategoryFecthBook } from '../models/category';
import { CategoryService } from '../service/category-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy{


  private subscription: Subscription = new Subscription();


  listCategoryResp: CategoryFecthBook[] = [];


  constructor(private categoryService: CategoryService,
    private modalService: NgbModal) { }
    

  ngOnInit(): void {

    this.findAllCategory();

    this.subscription.add(  

      this.categoryService.refresh.subscribe(resp =>{

        this.findAllCategory();
      })

    );
  }


  ngOnDestroy(): void {
   
    this.subscription.unsubscribe();
  }

  private findAllCategory(){

    this.categoryService.findlFetchBookAllCategory().subscribe(resp =>{

      this.listCategoryResp = resp.data;

    })


  }
  deleteCategory(ide: number) {
  
    this.categoryService.deleteCategory(ide).subscribe(resp =>{

      console.log("categoria eliminada");
    },error =>{
      console.log("Error categoria eliminar", error);

    });


  }
  openModalUpdate(ide: number) {
    const currentModal= this.modalService.open(ModalCategoryComponent, {size: 'lg'});
    currentModal.componentInstance.ideCategoryUpdate = ide;
  }


  openModal() {

    this.modalService.open(ModalCategoryComponent, {size: 'lg'});

  }


}
