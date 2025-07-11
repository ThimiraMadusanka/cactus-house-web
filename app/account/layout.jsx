import AccountLayout from "@components/layout/AccountLayout";

export default function AccountRootLayout({ children }) {
    return (
        <AccountLayout>
            {children}
        </AccountLayout>
    );
}