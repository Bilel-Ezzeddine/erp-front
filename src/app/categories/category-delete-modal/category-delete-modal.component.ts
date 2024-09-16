import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {CategoryState} from "../reducers/category.reducers";
import {deleteCategory} from "../actions/category.actions";

@Component({
  selector: 'app-category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrl: './category-delete-modal.component.css'
})
export class CategoryDeleteModalComponent {
  constructor(private store: Store<CategoryState>,
              @Inject(MAT_DIALOG_DATA) public data: { categoryId: number },
              public dialogRef: MatDialogRef<CategoryDeleteModalComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.store.dispatch(deleteCategory({categoryId: this.data.categoryId}))
    this.dialogRef.close(true);
  }
}
