import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Pageable} from '../models/pageable';
import {ProductResponse} from '../models/product-response';
import {ProductState} from './reducers/product.reducers';
import {getAllProducts, searchProductsByFilter} from './actions/product.actions';
import {selectAllProducts} from './selectors/product.selectors';
import {MatDialog} from '@angular/material/dialog';
import {ProductCreateModalComponent} from "./product-create-modal/product-create-modal.component";
import {ProductDeleteModalComponent} from "./product-delete-modal/product-delete-modal.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ProductFilterCriteria} from "../models/product-filter-criteria";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products$ = this.store.select(selectAllProducts);
  dataSource = new MatTableDataSource<ProductResponse>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  pageable: Pageable = {page: 0, size: 10, sort: 'asc'};
  displayedColumns = ['name', 'price', 'quantity', 'barcode', 'category', 'actions'];
  filterForm!: FormGroup;
  filtersVisible: boolean = true;


  constructor(private store: Store<ProductState>,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      price: [''],
      quantity: [''],
      barcode: [''],
      categoryName: ['']
    });
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(filters => {
      this.applyFilter(filters);
    });
    this.store.dispatch(getAllProducts({pageable: this.pageable}));
    this.loadProducts();
  }

  applyFilter(filters: ProductFilterCriteria) {
    const filterCriteria = {
      name: filters.name || null,
      price: filters.price || null,
      quantity: filters.quantity || null,
      barcode: filters.barcode || null,
      categoryName: filters.categoryName || null,
    } as ProductFilterCriteria;

    this.store.dispatch(searchProductsByFilter({
      filter: filterCriteria,
      pageable: this.pageable
    }));
  }


  loadProducts(): void {
    this.products$.subscribe((page) => {
      if (page?.content) {
        this.dataSource = new MatTableDataSource(page.content);
        this.dataSource.paginator = this.matPaginator;
        this.dataSource.sort = this.matSort;
      }
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ProductCreateModalComponent, {
      width: '40%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(getAllProducts({pageable: this.pageable}));
    });
  }

  onEdit(product: ProductResponse, isUpdate: boolean): void {
    const dialogRef = this.dialog.open(ProductCreateModalComponent, {
      width: '40%',
      data: {product, isUpdate}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(getAllProducts({pageable: this.pageable}));
    });
  }

  onRemove(productId: number): void {
    const dialogRef = this.dialog.open(ProductDeleteModalComponent, {
      width: '250px',
      data: {productId}
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(getAllProducts({pageable: this.pageable}));
      }
    });
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
}
