export type CreateOrder = {
    user_rid: number,
    product_list: any,
    total_amount: string,
    contact_number: string,
    shipping_address: string,
}

export type UpdateOrder = {
    product_list: any,
    total_amount: string,
    contact_number: string,
    shipping_address: string,
}