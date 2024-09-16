import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CategoryActions from '../actions/category.actions';
import {searchCategoriesByFilter} from '../actions/category.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CategoryService} from "../../services/category.service";

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) {
  }

  searchProductsByFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCategoriesByFilter),
      switchMap(({filter, pageable}) =>
        this.categoryService.searchByFilterCriteria(filter, pageable).pipe(
          map(categories => CategoryActions.getAllCategoriesSuccess({categories})),
          catchError(error => of(CategoryActions.getAllCategoriesFailure({error}))))
      )
    )
  );

  getAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getAllCategories),
      mergeMap(({pageable}) =>
        this.categoryService.getAllCategories(pageable).pipe(
          map(categories => CategoryActions.getAllCategoriesSuccess({categories})),
          catchError(error => of(CategoryActions.getAllCategoriesFailure({error})))
        )
      )
    )
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      mergeMap(({categoryId}) =>
        this.categoryService.getCategoryById(categoryId).pipe(
          map(category => CategoryActions.getCategoryByIdSuccess({category})),
          catchError(error => of(CategoryActions.getCategoryByIdFailure({error})))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      mergeMap(({categoryRequest}) =>
        this.categoryService.createCategory(categoryRequest).pipe(
          map(category => CategoryActions.createCategorySuccess({category})),
          catchError(error => of(CategoryActions.createCategoryFailure({error})))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap(({categoryId, categoryRequest}) =>
        this.categoryService.updateCategory(categoryId, categoryRequest).pipe(
          map(category => CategoryActions.updateCategorySuccess({category})),
          catchError(error => of(CategoryActions.updateCategoryFailure({error})))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap(({categoryId}) =>
        this.categoryService.deleteCategory(categoryId).pipe(
          map(() => CategoryActions.deleteCategorySuccess()),
          catchError(error => of(CategoryActions.deleteCategoryFailure({error})))
        )
      )
    )
  );
}
