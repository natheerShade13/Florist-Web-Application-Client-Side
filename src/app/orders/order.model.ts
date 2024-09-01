import { Product } from "../catalog/product.model";
import { Customer } from "../customer/customer.model";

export interface Orders{
    orderId: number,
    amount: number,
    orderDate: Date,
    status: string,
    customer: Customer,
    coupon: Coupon,
    orderLines: OrderLine[]
}

export interface OrderLine{
    orderLineId: number,
    orders: Orders,
    product: Product,
    quantity: number,
    quotedPrice: number
}

export interface Coupon{

}