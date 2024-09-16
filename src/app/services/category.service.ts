import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../models/pageable";
import {Page} from "../models/page";
import {CategoryResponse} from "../models/category-response";
import {CategoryRequest} from "../models/category-request";
import {CategoryFilterCriteria} from "../models/category-filter-criteria";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(pageable: Pageable): Observable<Page<CategoryResponse>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.get<Page<CategoryResponse>>(this.apiUrl, { params });
  }

  searchByFilterCriteria(filter: CategoryFilterCriteria, pageable: Pageable): Observable<Page<CategoryResponse>> {
    const params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.post<Page<CategoryResponse>>(`${this.apiUrl}/filter`, filter, { params });
  }

  getCategoryById(categoryId: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/${categoryId}`);
  }

  createCategory(categoryRequest: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.apiUrl, categoryRequest);
  }

  updateCategory(categoryId: number, categoryRequest: CategoryRequest): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.apiUrl}/${categoryId}`, categoryRequest);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}
