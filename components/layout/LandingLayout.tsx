import Footer from "../Footer"
import { LandingHeader } from "../header"

type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout = ({children} : LandingLayoutProps) => {
  return (
    <div>
      <LandingHeader />
      {children}
      <Footer />
    </div>
  )
}

export default LandingLayout
