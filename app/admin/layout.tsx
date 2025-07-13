import DashboardLayout from "@/components/layout/DashboardLayout";

type DashboardRootLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
} 