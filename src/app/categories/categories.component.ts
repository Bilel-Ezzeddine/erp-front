import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Pageable} from '../models/pageable';
import {CategoryResponse} from '../models/category-response';
import {CategoryState} from "./reducers/category.reducers";
import {getAllCategories, searchCategoriesByFilter} from "./actions/category.actions";
import {selectAllCategories} from "./selectors/category.selectors";
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreateModalComponent} from "./category-create-modal/category-create-modal.component";
import {CategoryDeleteModalComponent} from "./category-delete-modal/category-delete-modal.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {CategoryFilterCriteria} from "../models/category-filter-criteria";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$ = this.store.select(selectAllCategories);
  dataSource = new MatTableDataSource<CategoryResponse>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  pageable: Pageable = {page: 0, size: 10, sort: 'asc'};
  displayedColumns = ['name', 'actions'];
  filtersVisible: boolean = true;
  filterForm!: FormGroup;

  constructor(private store: Store<CategoryState>,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: ['']
    });
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(filters => {
      this.applyFilter(filters);
    });
    this.store.dispatch(getAllCategories({pageable: this.pageable}));
    this.loadCategories();
  }

  applyFilter(filters: CategoryFilterCriteria) {
    const filterCriteria = {
      name: filters.name || null
    } as CategoryFilterCriteria;

    this.store.dispatch(searchCategoriesByFilter({
      filter: filterCriteria,
      pageable: this.pageable
    }));
  }

  loadCategories(): void {
    this.categories$.subscribe((page) => {
      if (page?.content) {
        this.dataSource = new MatTableDataSource(page.content);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(CategoryCreateModalComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(getAllCategories({pageable: this.pageable}));
    });
  }

  onEdit(category: any, isUpdate: boolean): void {
    const dialogRef = this.dialog.open(CategoryCreateModalComponent, {
      width: '30%',
      data: {category, isUpdate}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(getAllCategories({pageable: this.pageable}));
    });
  }

  onRemove(categoryId: number): void {
    const dialogRef = this.dialog.open(CategoryDeleteModalComponent, {
      width: '250px',
      data: {categoryId}
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(getAllCategories({pageable: this.pageable}));
      }
    });
  }
  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
}
