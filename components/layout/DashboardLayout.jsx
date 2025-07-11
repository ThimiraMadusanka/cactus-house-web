import DashboardNav from "@components/nav/DashboardNav";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  )
}

export default DashboardLayout
