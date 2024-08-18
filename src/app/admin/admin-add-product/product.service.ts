import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/products'; // Ensure this matches the Spring Boot API

  // Create Product
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/create`, product); // Fixed URL
  }

  // Read Product by ID
  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/read/${id}`);
  }

  // Read All Products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/getAll`);
  }

  // Update Product
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/update`, product);
  }

  // Delete Product
  deleteProduct(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}
