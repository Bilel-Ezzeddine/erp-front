import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducers';
import { deleteProduct } from '../actions/product.actions';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent {
  constructor(
    private store: Store<ProductState>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    public dialogRef: MatDialogRef<ProductDeleteModalComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.store.dispatch(deleteProduct({ productId: this.data.productId }));
    this.dialogRef.close(true);
  }
}
