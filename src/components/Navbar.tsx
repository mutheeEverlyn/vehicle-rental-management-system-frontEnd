import logo from '../assets/logo.png'
import hamburger from '../assets/icon-hamburger.svg'
import { useState } from 'react'
import close from '../assets/icon-close.svg'
import  {Link}  from 'react-router-dom'
import MobileMenu from './MobileMenu'
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className='flex gap-5 bg-black text-white  p-5 w-full max-w-full '>
      <div className='w-40 md:w-56'><img src={logo} width={300} alt="logo"/></div>
      <nav className='hidden  md:flex md:justify-between md:gap-10  ml-auto '>
      <ul className='flex   gap-5 items-center '>
        <li><button><Link to='/' className='hover:underline'>HOME</Link></button></li>
        <li><button><Link to='/about'  className='hover:underline'>ABOUT US</Link></button></li>
        <li><button><Link to='/listing'  className='hover:underline'>CAR LISTING</Link></button></li>
        <li><button><Link to='/services'  className='hover:underline'>SERVICES</Link></button></li>
        <li><button><Link to='/contact'  className='hover:underline'>CONTACT US</Link></button></li>
      </ul>
      <div className='flex gap-5 items-center '>
      <button className=' bg-blue-400  hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 my-10'><Link to='/login'> LOGIN</Link></button>
      <button className='bg-blue-400  hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 my-10 '><Link to='/register'>REGISTER</Link></button>
      </div>
      </nav>
      {showMenu?(
       <button onClick={toggleMenu} className='cursor-pointer transition-all ml-auto'><img src={close} alt='close icon' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      ):(
        <button onClick={toggleMenu} className='ml-auto cursor-pointer transition-all' >< img src={hamburger} alt='icon humburger' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      )}
      <MobileMenu showItems={showMenu}/>
    </div>
  )
}

export default Navbar
