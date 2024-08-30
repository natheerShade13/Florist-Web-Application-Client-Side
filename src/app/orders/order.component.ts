import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { DatePipe } from "@angular/common";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import {Customer} from "../customer/customer.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    HeaderComponent,
  ],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order | null = null;
  customerId: number = 0;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadCustomerAndOrders();
  }

  loadCustomerAndOrders(): void {
    const customer = this.getCustomerFromLocalStorage();
    if (customer) {
      this.customerId = customer.customerId || 0;
      this.loadOrderByCustomer(this.customerId);
    } else {
      console.error('No customer information found');
    }
  }

  getCustomerFromLocalStorage(): Customer | null {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      return JSON.parse(storedCustomer);
    }
    return null;
  }

  loadOrderByCustomer(customerId: number): void {
    this.orderService.getOrdersByCustomer(customerId).subscribe({
      next: (orders) => {
        if (orders.length > 0) {
          this.order = orders[0];
        } else {
          console.log('No orders found for customer:', customerId);
        }
      },
      error: (error) => {
        console.error('Error fetching order:', error);
      }
    });
  }
}
