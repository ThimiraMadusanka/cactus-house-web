export type AddToCart = {
    user_rid: number;
    product_rid: number;
    amount: string;
}

export type CartTableData = {
    id: number;
    amount: string;
    created_at: string;
    updated_at: string;
    user_rid: number;

    product_id: number;
    product_rid: number;
    product_name: string;
    product_description: string;
    product_image_url: string;
    product_price: string;
    product_quantity: number;
    product_status: string;
    product_tags: string;
    product_created_at: string;
    product_updated_at: string;
}