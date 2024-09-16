import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {createProduct, updateProduct} from '../actions/product.actions';
import {ProductState} from '../reducers/product.reducers';
import {ProductRequest} from '../../models/product-request';
import {CategoryState} from "../../categories/reducers/category.reducers";
import {selectAllCategories} from "../../categories/selectors/category.selectors";
import {takeWhile} from "rxjs";
import {getAllCategories} from "../../categories/actions/category.actions";
import {Pageable} from "../../models/pageable";

@Component({
  selector: 'app-product-create-modal',
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.css']
})
export class ProductCreateModalComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  alive: boolean = true;
  pageable: Pageable = {page: 0, size: 10, sort: 'asc'};
  categories$ = this.store.select(selectAllCategories)
    .pipe(takeWhile(() => (this.alive)));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: any; isUpdate: boolean },
    private fb: FormBuilder,
    private store: Store<ProductState & CategoryState>,
    public dialogRef: MatDialogRef<ProductCreateModalComponent>
  ) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories({pageable: this.pageable}));
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.min(0)],
      quantity: [null, Validators.min(0)],
      barcode: ['', Validators.required],
      categoryId: [null, Validators.required]
    });

    if (this.data.isUpdate) {
      this.productForm.patchValue({
        ...this.data.product,
        categoryId: this.data.product.category?.id
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const productRequest: ProductRequest = {
        ...this.productForm.value
      };

      if (!this.data.isUpdate) {
        this.store.dispatch(createProduct({productRequest}));
      } else {
        this.store.dispatch(updateProduct({
          productId: this.data.product.id,
          productRequest: productRequest
        }));
      }
      this.dialogRef.close();
    }
  }
}
