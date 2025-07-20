export type CreateAndUpdateProduct = {
    name: string,
    description: string,
    price: string,
    quantity: number,
    file_content: string,
    file_name: string,
    content_type: string,
    tags: string[],
}

export type CreateProduct = {
    name: string,
    description: string,
    price: number,
    quantity: number,
    file_content: string,
    file_name: string,
    content_type: string,
    tags: string,
}

export type UpdateProduct = {
    name: string,
    description: string,
    price: number,
    quantity: number,
    file_content: string,
    file_name: string,
    content_type: string,
    tags: string,
}

export type ProductInputValidation = {
    name: string,
    description: string,
    price: string,
    quantity: string,
    image: string,
    tags: string,
}

export type ProductData = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  quantity: number;
  status: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};
