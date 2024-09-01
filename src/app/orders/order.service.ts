import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Orders } from './order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private customerId: number | null | undefined = null;

    private ordersSubject = new BehaviorSubject<Orders[]>([]);
    orders$ = this.ordersSubject.asObservable();
    private orders: Orders[] = []; // Array to store multiple orders

    constructor(private httpClient: HttpClient, private customerService: CustomerService) {
        const customer = this.customerService.getCustomerLocal();
        if (customer) {
            this.customerId = customer.customerId;
            this.getOrders();
        }
    }

    public getOrders() {
        if (this.customerId) {
            this.httpClient.get<Orders[]>(`http://localhost:8080/checkout/history/${this.customerId}`)
            .subscribe(orders => {
                this.ordersSubject.next(orders);
            })
        }
    }
}
