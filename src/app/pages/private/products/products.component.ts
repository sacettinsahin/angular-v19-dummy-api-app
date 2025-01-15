import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { DialogModule } from 'primeng/dialog';
import { TablePopupComponent } from '../../../components/table-dialog/table-dialog.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputWrapperComponent } from "../../../components/input-wrapper/input-wrapper.component";

@Component({
  selector: 'app-products',
  imports: [
    PageHeaderComponent,
    ButtonModule,
    TableModule,
    TruncatePipe,
    DialogModule,
    TablePopupComponent,
    ReactiveFormsModule,
    InputWrapperComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedItem!: Product;

  loading: boolean = true;
  showUpdate: boolean = false;
  showDelete: boolean = false;
  showAdd: boolean = false;

  addForm!: FormGroup;
  updateForm!: FormGroup;

  productService = inject(ProductService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => (this.products = res),
      (error) => console.log(error),
      () => (this.loading = false)
    );

    //add form
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  //---show - hide popups---
  onShow(item: Product, type: string): void {
    this.selectedItem = item;
    if (type == 'update'){
      this.updateForm.patchValue({
        name: item?.name,
        avatar: item?.avatar,
        description: item?.description,
        price: item?.price
      });

      this.showUpdate = true
    }
    else if (type == 'delete') this.showDelete = true;
  }
  onShowAdd(): void {
    this.showAdd = true;
  }

  onHide(isShow: boolean, type: string): void {
    if (type == 'update') this.showUpdate = false;
    else if (type == 'delete') this.showDelete = false;
    else if (type == 'add') this.showAdd = false;
  }
  //-----

  //---crud---
  addProduct(form: Product): void {
    this.productService.addProduct(form).subscribe(
      (res) => {
        console.log(res);

        this.products.push({
          id: String(this.products.length + 1),
          name: form.name,
          avatar: form.avatar,
          price: form.price,
          description: form.description,
        });
      },
      (err) => console.log(err)
    );

    this.showAdd = false;
  }

  updateProduct(form:Product): void{
    this.productService.updateProduct(form,this.selectedItem.id!).subscribe(
      res=>console.log(res),
      error=>console.log(error)
    )

    const updatedProduct = this.products.find(item=> item.id === this.selectedItem.id);
    if(updatedProduct){
      updatedProduct.name = form.name,
      updatedProduct.avatar = form.avatar,
      updatedProduct.description = form.description,
      updatedProduct.price = form.price
    }

    this.showUpdate = false;
  }

  deleteProduct():void{
    this.productService.deleteProduct(this.selectedItem.id!).subscribe(
      res=>console.log(res),
      error=>console.log(error)
    )

    this.products = this.products.filter(item=> item.id !== this.selectedItem.id);

    this.showDelete = false;
  }

  //-----

  onPage($event: TablePageEvent): void {}

  //features popup triggered.
  togglePopup(): void {}
}
