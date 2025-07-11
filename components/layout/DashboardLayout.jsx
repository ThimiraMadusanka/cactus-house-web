import { DashboardHeader } from "@components/header"

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}

export default DashboardLayout
