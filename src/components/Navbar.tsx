import logo from '../assets/logo.png'
import  {Link}  from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex gap-10 bg-black text-white justify-between p-5'>
      <div className=''><img src={logo} width={300} alt="logo"/></div>
      <ul className='flex gap-10 my-10'>
        <li><button><Link to='/'>HOME</Link></button></li>
        <li><button><Link to='/about'>ABOUT US</Link></button></li>
        <li><button><Link to='/listing'>CAR LISTING</Link></button></li>
        <li><button><Link to='/services'>SERVICES</Link></button></li>
        <li><button><Link to='/contact'>CONTACT US</Link></button></li>
      </ul>
      <div className='flex gap-5'>
      <button className=' bg-blue-400 rounded-md w-20 h-10 my-10'><Link to='/login'> LOGIN</Link></button>
      <button className='bg-blue-400 rounded-md w-20 h-10 my-10 '><Link to='/register'>REGISTER</Link></button>
      </div>
    </div>
  )
}

export default Navbar
