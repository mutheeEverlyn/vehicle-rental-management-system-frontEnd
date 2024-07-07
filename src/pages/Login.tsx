import { Link} from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import * as yup from 'yup';
const Login = () => {
  const [error,setError]=useState('')
  const[formData,setFormData]=useState({email:'',password:''});
  const [isLogin,setIsLogin]=useState(false);
  const validateForm=yup.object().shape({
    email:yup.string().required('email required').email('valid email required'),
    password:yup.string().required('password required').min(8,'invalid password').max(10,'invalid password')
  })
  const handleChange =(e:any)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleLogin=async (e:any)=>{
    e.preventDefault();
    try {
      await validateForm.validate(formData, { abortEarly: false });//abortEarly aborts once the first error is found hence should be false to complete checking for the other fields
      console.log('login successfull', formData);
      setError('');
      setIsLogin(true); 
    } catch (err: any) {
      setError(err.errors[0]);
      setIsLogin(false); 
    }

  }
  return (
    <>
    <div className="m-auto flex flex-col container min-h-[620px]">
    <h1 className="font-bold text-3xl m-auto">Login to Juneva car rentals </h1>
  <form onSubmit={handleLogin} className=" flex flex-col gap-5 my-10 mx-auto w-2/3 border-blue-400 rounded-md border-2 p-10">
  <label htmlFor="email">Enter Your email</label>
  {error && <p className='error-message'>{error}</p>}
    <input type="email" name="email" onChange={handleChange} placeholder="example@gmail.com"  className="border-2 border-black rounded-md p-2 {error ? 'error': ''}"/>
    <label htmlFor="password">Enter Your password</label>
    {error && <p className='error-message'>{error}</p>}
    <input type="password"  onChange={handleChange} placeholder="**********" className="border-2 border-black rounded-md p-2"/>
    {isLogin?(
    <button type="submit"  className="rounded-md  bg-blue-400  p-2"><Link to='/userDashboard'>Login</Link></button>
    ):(
    <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/'>Go Back</Link></button>
    )}
  </form>
</div>
 <Footer />
 </>
  )
}

export default Login
