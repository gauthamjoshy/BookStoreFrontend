import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginAPI, loginAPI, registerAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../../context/AuthContext'

function Auth({ register }) {

  const [viewPassword, setViewPassword] = useState(false)

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const navigate = useNavigate()

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info(`Fill the details completely`)
    } else {
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registered Successfully`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error(`Something went wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }

  // path protect
  const {setAuthorisedUser} = useContext(userAuthContext)

  
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Fill the details completely")
    } else {
      const result = await loginAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        // storing detail and token at session storage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        toast.success(`Login Successfully`)
        setAuthorisedUser(true)
        if (result.data.existingUser.role == "admin") {
          navigate("/admin-home")
        } else {
          navigate("/")
        }
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })


      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else if (result.status == 401) {
        toast.warning(result.response.data)
      } else {
        toast.error(`Something went wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }


  const handleGoogleLogin = async (credentialResponse) =>{
    // console.log(credentialResponse.credential);
    const googleData = jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try{
      const result = await googleLoginAPI({ email: googleData.email, password:"googlepassword", username: googleData.name, profile:googleData.picture })
      console.log(result);
      if(result.status == 200){
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        toast.success(`Login Successful`)
        setAuthorisedUser(true)
        if(result.data.existingUser.role == "admin"){
          navigate("/admin-home")
        }else{
          navigate("/")
        }
      }else{
        toast.error(`Something went wrong`)
      }
    }catch(error){
      console.log(error);    
    }   
  }



  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url("https://www.shutterstock.com/image-photo/book-open-pages-close-up-600nw-2467818435.jpg")] bg-cover bg-center'>
        <div className='p-10'>
          <h1 className='text-center font-bold text-3xl'>Book Store</h1>
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaUserCircle className='text-6xl' />

            </div>
            <h1 className='text-2xl'>{register ? "Register" : "Login"}</h1>

            <form action="">
              {register && <div className='my-5'>
                <label htmlFor="">Username</label>
                <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>}

              <div className='my-5'>
                <label htmlFor="">Email</label>
                <input value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>

              <div className='mt-5 relative'>
                <label htmlFor="">Password</label>
                <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={viewPassword ? "text" : "password"} placeholder='Password' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
                {viewPassword ? <FaEye onClick={() => setViewPassword(!viewPassword)} className='text-gray-500 cursor-pointer absolute right-3 bottom-3' /> :
                  <FaEyeSlash onClick={() => setViewPassword(!viewPassword)} className='text-gray-500 cursor-pointer absolute right-3 bottom-3' />}
              </div>

              <div className='mt-2'>
                <p className='text-xs text-orange-400'>*Never share your password with others</p>

              </div>

              <div className='mt-4'>
                {register ? <button type='button' onClick={handleRegister} className='bg-green-700 p-2 w-full rounded'>Register</button> :
                  <button type='button' onClick={handleLogin} className='bg-green-700 p-2 w-full rounded'>Login</button>}

              </div>

              <div className='w-full'>
                {/* google authentication */}
                {!register&&<div className='mt-5'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
              </div>}

              </div>

              <div className='mt-3'>
                {register?
                <p>Are you already a user? <Link className='text-blue-400' to={"/login"}>Login</Link> </p>
                :
                <p>Are you a new user? <Link className='text-blue-400' to={"/register"}>Register</Link> </p>
                }

              </div>


            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Auth