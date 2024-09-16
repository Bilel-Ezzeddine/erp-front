import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { ProductResponse } from '../../models/product-response';
import { Page } from '../../models/page';

export interface ProductState {
  products: Page<ProductResponse> | null;
  selectedProduct: ProductResponse | null;
  error: any | null;
  loading: boolean;
}

const initialState: ProductState = {
  products: null,
  selectedProduct: null,
  error: null,
  loading: false,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.getAllProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.getAllProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ProductActions.getAllProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.getProductById, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.getProductByIdSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(ProductActions.getProductByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.createProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.deleteProductSuccess, (state) => ({
    ...state,
    selectedProduct: null,
    loading: false,
  })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
