import Hero  from '../components/Hero'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import About from '../components/About'
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'
import CarList from '../components/CarList'
import Services from '../components/Services'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About/>
      <CarList/>
      <Services/>
      <Testimonial/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
