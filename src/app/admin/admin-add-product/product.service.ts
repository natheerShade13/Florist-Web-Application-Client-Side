import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Orders } from '../../orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/products';

  // Create
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/create`, product);
  }

  // Read Product by ID
  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/read/${id}`);
  }

  // Read All
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/getAll`);
  }

  // Update
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/update`, product);
  }

  // Delete
  deleteProduct(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
  getOrders(): Observable<Orders[]> {
    console.log('Calling API to get orders');
    return this.httpClient.get<Orders[]>(`${this.apiUrl}/orders/getAll`);
  }
}
