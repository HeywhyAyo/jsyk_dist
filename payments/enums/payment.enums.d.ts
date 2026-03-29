export declare enum PaymentMethod {
    CARD = "CARD",
    PAYPAL = "PAYPAL",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    WALLET = "WALLET"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED"
}
export declare enum PaymentGateway {
    STRIPE = "STRIPE",
    PAYSTACK = "PAYSTACK",
    FLUTTERWAVE = "FLUTTERWAVE",
    MANUAL = "MANUAL"
}
