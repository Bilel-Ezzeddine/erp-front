import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from '../models/pageable';
import {Page} from '../models/page';
import {ProductResponse} from '../models/product-response';
import {ProductRequest} from '../models/product-request';
import {ProductFilterCriteria} from "../models/product-filter-criteria";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {
  }

  getAllProducts(pageable: Pageable): Observable<Page<ProductResponse>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.get<Page<ProductResponse>>(this.apiUrl, {params});
  }

  searchByFilterCriteria(filter: ProductFilterCriteria, pageable: Pageable): Observable<Page<ProductResponse>> {
    const params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.post<Page<ProductResponse>>(`${this.apiUrl}/filter`, filter, {params});
  }

  getProductById(productId: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${productId}`);
  }

  createProduct(productRequest: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, productRequest);
  }

  updateProduct(productId: number, productRequest: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${productId}`, productRequest);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
