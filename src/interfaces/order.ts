export interface Order {
    id:              number;
    userId:          number;
    orderDate:       Date;
    status:          number;
    shippingAddress: string;
    totalAmount:     number;
    user:            UserOrder | null;
    items:           ItemOrder[];
}

export interface UserOrder {
    id:       number;
    name:     string;
    fullName: string;
    email:    string;
}

export interface ItemOrder {
    id:          number;
    orderId:     number;
    productId:   number;
    productName: string;
    quantity:    number;
    totalPrice:  number;
}