import {CategoryResponse} from "./category-response";

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  barcode: string;
  category: CategoryResponse;
}
