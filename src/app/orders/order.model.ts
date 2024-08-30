// order.model.ts
export interface Product {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface OrderLine {
  orderLineId: number;
  quantity: number;
  quotedPrice: number;
  product: Product;
}

export interface Order {
  orderId: number;
  amount: number;
  orderDate: string; // ISO date format
  status: string;
  orderLines: OrderLine[];
}
