type Summary = {
    days: string[];
    count: number[];
}

export type AdminSummaryData = {
    user_count: number;
    product_count: number;
    order_count: number;
    contact_count: number;
    weekly_summary: Summary;
}

export type AccountSummaryData = {
    delivered_order_count: number;
    pending_order_count: number;
    rejected_order_count: number;
    cart_count: number;
    weekly_summary: Summary;
}