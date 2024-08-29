import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from './review.service';
import { Review } from '../models/review.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Customer} from "../customer/customer.model";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() productId: number = 0;
  @Input() customerId: number = 0; // Ensure this is correctly set as an @Input

  review: Review = {
    comment: '',
    rating: 0,
    reviewDate: new Date().toISOString().split('T')[0],
    product: { productId: this.productId },
    customer: { customerId: this.customerId }
  };

  notificationMessage: string | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.productId) {
      this.review.product.productId = this.productId;
      const customer = this.getCustomerFromLocalStorage();
      if (customer) {
        this.review.customer.customerId = customer.customerId || 0;
      }
    }
  }

  submitReview(): void {
    if (this.productId && this.review.customer.customerId) {
      this.reviewService.submitReview(this.review).subscribe({
        next: (response) => {
          console.log('Review submitted successfully', response);
          this.review.comment = '';
          this.review.rating = 0;
          this.notificationMessage = 'Review submitted successfully!';
        },
        error: (error) => {
          console.error('Error submitting review', error);
          this.notificationMessage = 'Failed to submit review. Please try again.';
        }
      });
    } else {
      this.notificationMessage = 'Please ensure all fields are filled out correctly.';
    }
  }

  private getCustomerFromLocalStorage(): Customer | null {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      return JSON.parse(storedCustomer);
    }
    return null;
  }
}
