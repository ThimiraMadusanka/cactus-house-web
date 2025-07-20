export type CreateOrder = {
    user_rid: number,
    product_list: any,
    total_amount: string,
    contact_number: string,
    shipping_address: string,
}

export type UpdateOrder = {
    contact_number: string,
    shipping_address: string,
}

export type OrderFormInputValidation = {
    product_list: any,
    total_amount: string,
    contact_number: string,
    shipping_address: string,
}

export type CartProduct = {
  id: number;
  cart_id: number;
  name: string;
  image: string;
  price: string;
  amount: string;
};

export type AdminOrderTableData = {
    id: number;
    order_id: string;
    user_rid: number;
    product_list: CartProduct[];
    total_amount: string;
    contact_number: string;
    shipping_address: string;
    status: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    user_contact_number: string;
    user_billing_address: string;
    user_type: string;
    user_status: string;
    user_created_at: string;
    user_updated_at: string;
}

export type OrderTableData = {
    id: number;
    order_id: string;
    user_rid: number;
    product_list: CartProduct[];
    total_amount: string;
    contact_number: string;
    shipping_address: string;
    status: string;
    created_at: string;
    updated_at: string;
}
