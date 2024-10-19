import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

    constructor(private httpClient: HttpClient, private customerService: CustomerService) {
        const customer = this.customerService.getCustomerLocal();
        if (customer) {
            this.customerId = customer.customerId;
            this.customer = customer;
            this.loadOrders();
        }
    }

    public getOrders(): Observable<Orders[]> {
        if (this.customerId) {
            return this.httpClient.get<Orders[]>(`http://localhost:8080/checkout/history/${this.customerId}`).pipe(
                tap(orders => {
                    orders.sort((a, b) => {
                        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
                    });
                    this.ordersSubject.next(orders);
                })
            );
        } else {
            return this.ordersSubject.asObservable();
        }
    }

    public addOrder(): void {
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

    private loadOrders(): void {
        this.getOrders().subscribe();
    }
}
