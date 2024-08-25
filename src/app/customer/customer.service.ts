import { inject, Injectable, OnInit } from "@angular/core";
import { Customer } from "./customer.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomerService implements OnInit {

    private httpClient = inject(HttpClient);

    ngOnInit() {
        
    }

    // Get customer by email
    public getCustomer(email: string | undefined | null): Observable<Customer> {
        return this.httpClient.get<Customer>(`http://localhost:8080/customer/login/${email}`);
    }

    // Verify customer credentials
    public verifyCustomer(email: string, password: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`http://localhost:8080/customer/login/${email}/${password}`);
    }

    // Register a new customer
    public registerCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.post<Customer>(`http://localhost:8080/customer/register`, customer);
    }

    // Update existing customer
    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.put<Customer>(`http://localhost:8080/customer/update`, customer);
    }

    // Admin Methods
    public verifyAdmin(email: string, password: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`http://localhost:8080/admin/login/${email}/${password}`);
    }

   
    public getAdmin(email: string): Observable<any> {
        return this.httpClient.get<Customer>(`http://localhost:8080/admin/login/${email}`);
    }

   
    public authenticate(email: string, password: string): Observable<string> {
        let params = new HttpParams()
            .set('email', email)
            .set('password', password);

        return this.httpClient.post<string>(`http://localhost:8080/auth/login`, null, {
            params: params,
            responseType: 'text' as 'json' // Pass as json else error
        });
    }

    // Get customer from local storage
    public getCustomerLocal(): Customer | null {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            // Parse the JSON string to a Customer object
            const customer: Customer = JSON.parse(storedCustomer);
            return customer;
        }
        return null;
    }
}
