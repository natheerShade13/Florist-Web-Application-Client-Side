import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from '../orders/order.model';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../orders/order.service';
import {ProductService} from "./admin-add-product/product.service";

@Component({
  selector: 'app-admin-view-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-view-orders.component.html',
  styleUrls: ['./admin-view-orders.component.css']
})
export class AdminViewOrdersComponent implements OnInit {
  orders: (Orders & { showDetails: boolean })[] = [];
  private orderService = inject(ProductService);

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Orders[]) => {
        console.log('Received orders:', orders);
        this.orders = orders.map(order => ({
          ...order,
          showDetails: false
        }));
      },
      (error: any) => {  // Explicitly typed 'error'
        console.error('Error loading orders:', error);
        alert('Failed to load orders. Please try again later.');
      }
    );
  }

  toggleOrderDetails(order: Orders & { showDetails: boolean }): void {
    order.showDetails = !order.showDetails;
  }

  Logout(): void {
    localStorage.removeItem('customer');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login/admin']).then(() => {
      window.location.reload();
    });
  }
}
