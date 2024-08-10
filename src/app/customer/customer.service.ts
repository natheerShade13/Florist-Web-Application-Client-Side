import { inject, Injectable } from "@angular/core";
import { Customer } from "./customer.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    customer!: Customer;
    private httpClient = inject(HttpClient);
    //private URL = `http://localhost:8080/customer/"

    public verifyCustomer(email: string, password: string): Observable<Customer> { // Return user object
        return this.httpClient.get<Customer>(`http://localhost:8080/customer/login/${email}/${password}`);
    }

    public registerCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.post<Customer>(`http://localhost:8080/customer/registerB`, customer);
    }

}