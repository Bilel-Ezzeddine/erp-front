import {createReducer, on} from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';
import {CategoryResponse} from "../../models/category-response";
import {Page} from "../../models/page";

export interface CategoryState {
  categories: Page<CategoryResponse> | null;
  selectedCategory: CategoryResponse | null;
  error: any | null;
  loading: boolean;
}

const initialState: CategoryState = {
  categories: null,
  selectedCategory: null,
  error: null,
  loading: false
};

export const categoryReducer = createReducer(
  initialState,

  on(CategoryActions.getAllCategories, (state) => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.getAllCategoriesSuccess, (state, {categories}) => ({
    ...state,
    categories,
    loading: false
  })),
  on(CategoryActions.getAllCategoriesFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  on(CategoryActions.getCategoryById, (state) => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.getCategoryByIdSuccess, (state, {category}) => ({
    ...state,
    selectedCategory: category,
    loading: false
  })),
  on(CategoryActions.getCategoryByIdFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  on(CategoryActions.createCategory, (state) => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.createCategorySuccess, (state, {category}) => ({
    ...state,
    selectedCategory: category,
    loading: false
  })),
  on(CategoryActions.createCategoryFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  on(CategoryActions.updateCategory, (state) => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.updateCategorySuccess, (state, {category}) => ({
    ...state,
    selectedCategory: category,
    loading: false
  })),
  on(CategoryActions.updateCategoryFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  on(CategoryActions.deleteCategory, (state) => ({
    ...state,
    loading: true
  })),
  on(CategoryActions.deleteCategorySuccess, (state) => ({
    ...state,
    selectedCategory: null,
    loading: false
  })),
  on(CategoryActions.deleteCategoryFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  }))
);
