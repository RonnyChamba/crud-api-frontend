import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDTO } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css']
})
export class ModalCategoryComponent implements OnInit {


  @Input() ideCategoryUpdate: number;
  categoryDTO = new CategoryDTO();


  constructor(public ngActiveModal: NgbActiveModal,
    private categoryService: CategoryService) { }


  ngOnInit(): void {

    this.initData();
  }

  private initData() {

    this.initValuesCategory();
  }

  private initValuesCategory() {


    if (this.ideCategoryUpdate) {
      this.findCategoryByIde();
    }
  }

  private findCategoryByIde() {

    this.categoryService.findCategoryByIde(this.ideCategoryUpdate).subscribe(resp => {
      this.categoryDTO = resp;

    })


  }
  clickButtonOperation() {

    let smsValid = this.validCategory();

    if (!smsValid) {

      if (this.ideCategoryUpdate)

        this.updateCategory();

      else this.saveCategory();

    } else  
    {

      alert(smsValid);
      console.log(smsValid);
    }



  }

  private saveCategory() {

    this.categoryService.saveCategory(this.categoryDTO).subscribe(resp => {


      this.ngActiveModal.dismiss();
      alert("Category saved");

    }, error => {
      console.log(error);
    });

  }
  private updateCategory() {
    
    this.categoryService.updateCategory( this.ideCategoryUpdate, this.categoryDTO).subscribe(resp =>{

      this.ngActiveModal.dismiss();
      alert("Category update");
    }, error =>{

      alert(" Error Category update");
      console.log(error);

    } )

  }

  private validCategory() {

    let smsValid = "";


    if (!this.categoryDTO.name)
      smsValid = `Category is required`;

    return smsValid;

  }




}
