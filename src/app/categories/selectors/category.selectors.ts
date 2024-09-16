import { createSelector, createFeatureSelector } from '@ngrx/store';
import {CategoryState} from "../reducers/category.reducers";

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.selectedCategory
);

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loading
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.error
);
