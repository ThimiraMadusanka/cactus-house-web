export type SignIn = {
    email: string,
    password: string,
}

export type SignUp = {
    name: string,
    email: string,
    password: string,
    contactNumber: string,
    billingAddress: string,
}

export type ForgetPassword = {
    email: string,
}

export type ResetPassword = {
    new_password: string,
    confirm_password: string,
}