import { DashboardHeader } from "@components/header"

const AccountLayout = ({ children }) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}

export default AccountLayout
