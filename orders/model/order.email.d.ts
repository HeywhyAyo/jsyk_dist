export interface OrderEmailModel {
    email: string;
    firstName: string;
    orderId: string;
    orderDate: string;
    products: {
        productName: string;
        qty: number;
        unitPrice: string;
    }[];
    totalPrice: string;
    shippingAddress: string;
    trackingLink: string;
    year: number;
}
