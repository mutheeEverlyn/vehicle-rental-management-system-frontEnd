import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import * as yup from 'yup';

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [error, setError] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // Reset form state and login status when component mounts
  useEffect(() => {
    setFormData({ email: '', password: '' });
    setError({});
    setIsLogin(false);
  }, []);

  //  validation using yup
  const validateForm = yup.object().shape({
    email: yup.string().required('Email is required').email('A valid email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(10, 'Password must be at most 10 characters')
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validateForm.validate(formData, { abortEarly: false });
      console.log('Login successful', formData);
      setError({});
      setIsLogin(true);
      navigate('/userDashboard'); // Navigate to userDashboard upon successful login
    } catch (err: any) {
      const validationErrors: FormErrors = {};
      err.inner.forEach((error: yup.ValidationError) => {
        validationErrors[error.path as keyof FormData] = error.message;
      });
      setError(validationErrors);
      setIsLogin(false);
    }
  };

  return (
    <>
      <div className="m-auto flex flex-col container min-h-[620px]">
        <h1 className="font-bold text-3xl m-auto">Login to Juneva car rentals</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5 my-10 mx-auto w-2/3 border-blue-400 rounded-md border-2 p-10">
          <label htmlFor="email">Enter Your email</label>
          {error.email && <p className='text-red-600'>{error.email}</p>}
          <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2" />

          <label htmlFor="password">Enter Your password</label>
          {error.password && <p className='text-red-600'>{error.password}</p>}
          <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="**********" className="border-2 border-black rounded-md p-2" />
          <button type="submit" className="rounded-md bg-blue-400 p-2">Login</button>
          <button type="button" className="rounded-md bg-blue-400 p-2">
            <Link to='/'>Go Back</Link>
          </button>
        </form>
       
      </div>
      <Footer />
    </>
  );
}

export default Login;
