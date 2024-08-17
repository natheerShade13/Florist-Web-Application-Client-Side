import { inject, Injectable, OnInit } from "@angular/core";
import { Customer } from "./customer.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomerService implements OnInit {

    //customer!: Customer;
    //customerLocal!: Customer;

    ngOnInit() {

    }

    private httpClient = inject(HttpClient);
    //private URL = `http://localhost:8080/customer/"

    public getCustomer(email: string | undefined | null): Observable<Customer> { // Return user object
        return this.httpClient.get<Customer>(`http://localhost:8080/customer/login/${email}`);
    }

    public verifyCustomer(email: string, password: string): Observable<boolean> { // Return user object
        return this.httpClient.get<boolean>(`http://localhost:8080/customer/login/${email}/${password}`);
    }

    public registerCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.post<Customer>(`http://localhost:8080/customer/register`, customer);
    }

    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.put<Customer>(`http://localhost:8080/customer/update`, customer);
    }

    getCustomerLocal(): Customer | null {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            // Parse the JSON string to a Customer object
            const customer: Customer = JSON.parse(storedCustomer);
            //console.log(customer);
            return (customer)
        }
        return null;
    }

}