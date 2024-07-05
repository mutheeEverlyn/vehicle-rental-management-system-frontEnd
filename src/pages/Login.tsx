import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const Login = () => {
  return (
    <>
    <div className="my-10 mx-20 flex flex-col">
    <h1 className="font-bold text-3xl m-auto">Register with Juneva car rentals to get started</h1>
  <form className=" flex flex-col gap-5 my-10 mx-auto w-2/3 border-blue-400 rounded-md border-2 p-10">
  <label htmlFor="email">Enter Your email</label>
    <input type="email" placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2"/>
    <label htmlFor="password">Enter Your password</label>
    <input type="password" placeholder="**********" className="border-2 border-black rounded-md p-2"/>
    <button type="submit" className="rounded-md  bg-blue-400 p-2">Register</button>
    <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/'>Go Back</Link></button>
  </form>
</div>
 <Footer />
 </>
  )
}

export default Login
