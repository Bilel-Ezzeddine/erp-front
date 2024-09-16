import {createAction, props} from '@ngrx/store';
import {Pageable} from "../../models/pageable";
import {Page} from "../../models/page";
import {CategoryResponse} from "../../models/category-response";
import {CategoryRequest} from "../../models/category-request";
import {CategoryFilterCriteria} from "../../models/category-filter-criteria";

export const searchCategoriesByFilter = createAction(
  '[Product] Search Products By Filter',
  props<{ filter: CategoryFilterCriteria, pageable: Pageable }>()
);

export const getAllCategories = createAction(
  '[Category] Get All Categories',
  props<{ pageable: Pageable }>()
);

export const getAllCategoriesSuccess = createAction(
  '[Category] Get All Categories Success',
  props<{ categories: Page<CategoryResponse> }>()
);

export const getAllCategoriesFailure = createAction(
  '[Category] Get All Categories Failure',
  props<{ error: any }>()
);

export const getCategoryById = createAction(
  '[Category] Get Category By ID',
  props<{ categoryId: number }>()
);

export const getCategoryByIdSuccess = createAction(
  '[Category] Get Category By ID Success',
  props<{ category: CategoryResponse }>()
);

export const getCategoryByIdFailure = createAction(
  '[Category] Get Category By ID Failure',
  props<{ error: any }>()
);

export const createCategory = createAction(
  '[Category] Create Category',
  props<{ categoryRequest: CategoryRequest }>()
);

export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{ category: CategoryResponse }>()
);

export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ categoryId: number, categoryRequest: CategoryRequest }>()
);

export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ category: CategoryResponse }>()
);

export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Category] Delete Category',
  props<{ categoryId: number }>()
);

export const deleteCategorySuccess = createAction(
  '[Category] Delete Category Success'
);

export const deleteCategoryFailure = createAction(
  '[Category] Delete Category Failure',
  props<{ error: any }>()
);
