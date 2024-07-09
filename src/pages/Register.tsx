import { useState, ChangeEvent, FormEvent } from "react";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

type FormData = {
  full_name: string;
  email: string;
  password: string;
};

type FormErrors = {
  full_name?: string;
  email?: string;
  password?: string;
};

const Register = () => {
  const [error, setError] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({ full_name: '', email: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  //  form validation using yup
  const validateForm = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().required('Email is required').email('A valid email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(10, 'Password must be at most 10 characters')
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validateForm.validate(formData, { abortEarly: false });
      console.log('Registration successful', formData);
      setError({});
      setIsRegistered(true);
      navigate('/login'); // Navigate to login form upon successful registration
    } catch (err: any) {
      const validationErrors: FormErrors = {};
      err.inner.forEach((error: yup.ValidationError) => {
        validationErrors[error.path as keyof FormData] = error.message;
      });
      setError(validationErrors);
      setIsRegistered(false);
    }
  };

  return (
    <>
      <div className="m-auto flex flex-col container min-h-[620px]">
        <h1 className="font-bold text-3xl m-auto">Register with Juneva car rentals to get started</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
          <label htmlFor="full_name">Enter Your full name</label>
          {error.full_name && <p className='text-red-600'>{error.full_name}</p>}
          <input type="text" name="full_name" onChange={handleChange} value={formData.full_name} placeholder="John Doe" className="border-2 border-black rounded-md p-2" />
          
          <label htmlFor="email">Enter Your email</label>
          {error.email && <p className='text-red-600'>{error.email}</p>}
          <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2" />
          
          <label htmlFor="password">Enter Your password</label>
          {error.password && <p className='text-red-600'>{error.password}</p>}
          <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="**********" className="border-2 border-black rounded-md p-2" />
          
          {/* <label htmlFor="role">Choose your role</label>
          <select name="role" id="role" className="w-30 border-black border rounded-md p-2">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="userAdminRoleAuth">userAdminRoleAuth</option>
          </select> */}
          
          
          <button type="submit" className="rounded-md bg-blue-400 p-2">Register</button>
          
          <button type="button" className="rounded-md bg-blue-400 p-2">
            <Link to='/'>Go Back</Link>
          </button>
          <p>Already registered? <Link to='/login' className="text-blue-400">LOGIN</Link></p>
          <p>Admin? <Link to='/login'  className="text-blue-400">login here</Link></p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
