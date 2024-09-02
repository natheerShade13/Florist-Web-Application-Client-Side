// review.model.ts
export interface Review {
  reviewId?: number;
  comment: string;
  rating: number;
  reviewDate: string; // ISO date format
  product: {
    productId: number;
  };
  customer: {
    customerId: number;
  };
}
