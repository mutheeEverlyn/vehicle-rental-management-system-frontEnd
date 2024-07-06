import Hero  from '../components/Hero'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import About from '../components/About'
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About/>
      <Testimonial/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
