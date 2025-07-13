import AccountLayout from "@/components/layout/AccountLayout";

type AccountRootLayoutProps = {
  children: React.ReactNode;
};

export default function AccountRootLayout({ children }: AccountRootLayoutProps) {
    return (
        <AccountLayout>
            {children}
        </AccountLayout>
    );
}