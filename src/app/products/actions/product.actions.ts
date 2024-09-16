import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../models/pageable';
import {Page} from '../../models/page';
import {ProductResponse} from '../../models/product-response';
import {ProductRequest} from '../../models/product-request';
import {ProductFilterCriteria} from "../../models/product-filter-criteria";

export const searchProductsByFilter = createAction(
  '[Product] Search Products By Filter',
  props<{ filter: ProductFilterCriteria, pageable: Pageable }>()
);

export const getAllProducts = createAction(
  '[Product] Get All Products',
  props<{ pageable: Pageable }>()
);

export const getAllProductsSuccess = createAction(
  '[Product] Get All Products Success',
  props<{ products: Page<ProductResponse> }>()
);

export const getAllProductsFailure = createAction(
  '[Product] Get All Products Failure',
  props<{ error: any }>()
);

export const getProductById = createAction(
  '[Product] Get Product By ID',
  props<{ productId: number }>()
);

export const getProductByIdSuccess = createAction(
  '[Product] Get Product By ID Success',
  props<{ product: ProductResponse }>()
);

export const getProductByIdFailure = createAction(
  '[Product] Get Product By ID Failure',
  props<{ error: any }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ productRequest: ProductRequest }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: ProductResponse }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ productId: number, productRequest: ProductRequest }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: ProductResponse }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success'
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);
