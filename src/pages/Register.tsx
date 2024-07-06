
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
const Register = () => {
  return (
    <>
    <div className="m-auto flex flex-col container min-h-[620px]">
        <h1 className="font-bold text-3xl m-auto">Register with Juneva car rentals to get started</h1>
      <form className=" flex flex-col gap-5 mx-auto w-2/3 my-10 border-blue-400 rounded-md border-2 p-10">
      <label htmlFor="full_name">Enter Your full name</label>
      <input type="text" placeholder="john doe" className="border-2 border-black rounded-md p-2"/>
      <label htmlFor="email">Enter Your email</label>
        <input type="email" placeholder="example@gmail.com" className="border-2 border-black rounded-md p-2"/>
        <label htmlFor="password">Enter Your password</label>
        <input type="password" placeholder="**********" className="border-2 border-black rounded-md p-2"/>
        {/* <label htmlFor="role">Choose your role</label>
        <select name="role" id="role" className="w-30 border-black border rounded-md p-2">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="userAdminRoleAuth">userAdminRoleAuth</option>
        </select> */}
       <p> Admin ?<Link to='/RegisterAdmin'>register here</Link></p>
        <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/login'>Register</Link></button>
        <button type="submit" className="rounded-md  bg-blue-400 p-2"><Link to='/'>Go Back</Link></button>
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default Register
