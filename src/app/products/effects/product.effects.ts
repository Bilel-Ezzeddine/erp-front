import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import {searchProductsByFilter} from '../actions/product.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {
  }

  searchProductsByFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProductsByFilter),
      switchMap(({filter, pageable}) =>
        this.productService.searchByFilterCriteria(filter, pageable).pipe(
          map(products => ProductActions.getAllProductsSuccess({products})),
          catchError(error => of(ProductActions.getAllProductsFailure({error}))))
      )
    )
  );


  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProducts),
      mergeMap(({pageable}) =>
        this.productService.getAllProducts(pageable).pipe(
          map(products => ProductActions.getAllProductsSuccess({products})),
          catchError(error => of(ProductActions.getAllProductsFailure({error})))
        )
      )
    )
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductById),
      mergeMap(({productId}) =>
        this.productService.getProductById(productId).pipe(
          map(product => ProductActions.getProductByIdSuccess({product})),
          catchError(error => of(ProductActions.getProductByIdFailure({error})))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({productRequest}) =>
        this.productService.createProduct(productRequest).pipe(
          map(product => ProductActions.createProductSuccess({product})),
          catchError(error => of(ProductActions.createProductFailure({error})))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({productId, productRequest}) =>
        this.productService.updateProduct(productId, productRequest).pipe(
          map(product => ProductActions.updateProductSuccess({product})),
          catchError(error => of(ProductActions.updateProductFailure({error})))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({productId}) =>
        this.productService.deleteProduct(productId).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError(error => of(ProductActions.deleteProductFailure({error})))
        )
      )
    )
  );
}
