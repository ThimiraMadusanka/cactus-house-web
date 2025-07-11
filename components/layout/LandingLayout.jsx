import Footer from '@components/Footer'
import { LandingHeader } from '@components/header'

const LandingLayout = ({ children }) => {
  return (
    <div>
      <LandingHeader />
      {children}
      <Footer />
    </div>
  )
}

export default LandingLayout
