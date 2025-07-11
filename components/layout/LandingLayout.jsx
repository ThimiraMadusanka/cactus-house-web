import Footer from '@components/Footer'
import LandingNav from '@components/nav/LandingNav'

const LandingLayout = ({ children }) => {
  return (
    <div>
      <LandingNav />
      {children}
      <Footer />
    </div>
  )
}

export default LandingLayout
