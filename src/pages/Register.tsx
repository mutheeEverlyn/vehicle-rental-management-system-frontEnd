import { useState } from "react";
import * as yup from 'yup';
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
const Register = () => {
  const [error,setError]=useState('')
  const[formData,setFormData]=useState({full_name:'',email:'',password:''});
  const [isRegistered,setIsRegistered]=useState(false);
  //rules for the form using yup
  const validateForm=yup.object().shape({
    full_name:yup.string().required('full name required'),
    email:yup.string().required('email required').email('valid email required'),
    password:yup.string().required('password required').min(8,'invalid password').max(10,'invalid password')
  })
  const handleChange =(e:any)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleRegister=async (e:any)=>{
    e.preventDefault();
    try {
      await validateForm.validate(formData, { abortEarly: false });//abortEarly aborts once the first error is found hence should be false to complete checking for the other fields
      console.log('registration successfull', formData);
      setError('');
      setIsRegistered(true); 
    } catch (err: any) {
      setError(err.errors[0]);
      setIsRegistered(false); 
    }

  }
  return (
    <>
    <div className="m-auto flex flex-col container min-h-[620px]">
        <h1 className="font-bold text-3xl m-auto">Register with Juneva car rentals to get started</h1>
      <form onSubmit={handleRegister} className=" flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
      <label htmlFor="full_name">Enter Your full name</label>
      {error && <p className='error-message'>{error}</p>}
      <input type="text" onChange={handleChange} placeholder="john doe" className="border-2 border-black rounded-md p-2"/>
      <label htmlFor="email">Enter Your email</label>
      {error && <p className='error-message'>{error}</p>}
        <input type="email" onChange={handleChange} placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2"/>
        <label htmlFor="password">Enter Your password</label>
        {error && <p className='error-message'>{error}</p>}
        <input type="password" onChange={handleChange} placeholder="**********" className="border-2 border-black rounded-md p-2"/>
        {/* <label htmlFor="role">Choose your role</label>
        <select name="role" id="role" className="w-30 border-black border rounded-md p-2">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="userAdminRoleAuth">userAdminRoleAuth</option>
        </select> */}
       <p> Admin ?<Link to='/RegisterAdmin'>register here</Link></p>
       {isRegistered?(
        <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/login'>Register</Link></button>
       ):(
        <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/'>Go Back</Link></button>
       )}
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default Register
