import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Orders } from './order.model';
import { Customer } from '../customer/customer.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private customerId: number | null | undefined = null;
    customer: Customer | null | undefined = null;

    private ordersSubject = new BehaviorSubject<Orders[]>([]);
    orders$ = this.ordersSubject.asObservable();
    //private orders: Orders[] = []; // Array to store multiple orders

    constructor(private httpClient: HttpClient, private customerService: CustomerService) {
        const customer = this.customerService.getCustomerLocal();
        if (customer) {
            this.customerId = customer.customerId;
            this.customer = customer;
            this.getOrders();
        }
    }

    public getOrders() {
        if (this.customerId) {
            this.httpClient.get<Orders[]>(`http://localhost:8080/checkout/history/${this.customerId}`)
            .subscribe(orders => {
                this.ordersSubject.next(orders);
            });
        }
    }

    public addOrder() {
        if (this.customerId) {
            const currentOrder = this.ordersSubject.value;

          this.httpClient.post<Orders>(`http://localhost:8080/checkout/add`, this.customer)
            .subscribe({
              next: (order: Orders) => {
                currentOrder.push(order);
                this.ordersSubject.next(currentOrder);
              },
              error: (error: HttpErrorResponse) => {
                alert(error.message);
              }
            });
        }
      }

}
