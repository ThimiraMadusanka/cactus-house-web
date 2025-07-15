export type CreateUser = {
    name: string,
    email: string,
    password: string,
    contact_number: string,
    billing_address: string,
}

export type UpdateUser = {
    name: string,
    contact_number: string,
    billing_address: string,
}

export type ResetPasswordUser = {
    password: string,
}

export type UserTableData = {
    id: number,
    name: string,
    email: string,
    password: string,
    contact_number: string,
    billing_address: string,
    status: string,
    type: string,
    created_at: string;
    updated_at: string;
}
