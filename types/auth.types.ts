export type SignIn = {
    email: string,
    password: string,
}

export type SignInInputValidation = {
    email: string,
    password: string,
}

export type SignUp = {
    name: string,
    email: string,
    password: string,
    contact_number: string,
    billing_address: string,
}

export type SignUpInputValidation = {
    name: string,
    email: string,
    password: string,
    contact_number: string,
    billing_address: string,
}

export type ForgetPassword = {
    email: string,
}

export type ForgetPasswordInputValidation = {
    email: string
}

export type ResetPassword = {
    new_password: string,
    confirm_password: string,
}

export type ResetPasswordInputValidation = {
    new_password: string,
    confirm_password: string,
}

export type AuthenticatedUser = {
  name: string;
  email: string;
  contact_number: string;
  billing_address: string;
  type: "USER" | "ADMIN";
};
