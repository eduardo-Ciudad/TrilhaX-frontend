import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import Careers from '../components/sections/Careers.jsx'
import Plans from '../components/sections/Plans.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-trilha-bg">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Careers />
        <Plans />
      </main>
      <Footer />
    </div>
  )
}
