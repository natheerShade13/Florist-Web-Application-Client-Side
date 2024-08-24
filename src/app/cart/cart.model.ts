import { Product } from "../catalog/product.model";
import { Customer } from "../customer/customer.model";

export interface Cart{
    cartId: number,
    dateCreated: Date,
    customer: Customer
}

export interface CartProduct{
    cartProductId: number,
    cart: Cart,
    product: Product,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}