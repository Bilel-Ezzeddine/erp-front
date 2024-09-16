import {Component, Inject, OnInit} from '@angular/core';
import {CategoryRequest} from "../../models/category-request";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {createCategory, updateCategory} from "../actions/category.actions";
import {Store} from "@ngrx/store";
import {CategoryState} from "../reducers/category.reducers";

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrl: './category-create-modal.component.css'
})
export class CategoryCreateModalComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any; isUpdate: boolean },
    private fb: FormBuilder,
    private store: Store<CategoryState>,
    public dialogRef: MatDialogRef<CategoryCreateModalComponent>
  ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    if (this.data.isUpdate) {
      this.categoryForm.patchValue(this.data.category);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      const categoryRequest: CategoryRequest = {
        name: this.categoryForm.value.name,
      };

      if (!this.data.isUpdate) {
        this.store.dispatch(createCategory({categoryRequest}));
      } else {
        categoryRequest.name = this.categoryForm.get("name")?.value;
        this.store.dispatch(updateCategory({
          categoryId: this.data.category.id,
          categoryRequest: categoryRequest
        }));
      }
      this.dialogRef.close();
    }
  }
}
