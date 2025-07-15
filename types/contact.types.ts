export type CreateContact = {
    name: string;
    email: string;
    message: string;
}

export type ContactTableData = {
    id: number;
    name: string;
    email: string;
    message: string;
    status: string; 
    created_at: string;
    updated_at: string;
};

export type CreateContactInputValidation = {
    name: string;
    email: string;
    message: string;
}
