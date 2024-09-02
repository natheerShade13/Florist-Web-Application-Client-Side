import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/reviews/save';

  constructor(private http: HttpClient) {}

  submitReview(review: Review): Observable<any> {
    return this.http.post<any>(this.apiUrl, review);
  }
}
