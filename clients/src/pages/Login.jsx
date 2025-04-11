import React from 'react'
import { useEffect } from 'react'
import { gapi } from "gapi-script"
import { useState } from 'react'
import { loginUser } from '../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from 'react-toastify';
import { validUser } from '../apis/auth'

const defaultData = {
  email: "",
  password: ""
}

function Login() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true);
      try {
        const { data } = await loginUser(formData); // <-- log here
        console.log("loginUser response:", res);

        // if (res?.data?.token) {
        //   localStorage.setItem("userToken", res.data.token);
        //   toast.success("Successfully Logged In!");
        //   setIsLoading(false);
        //   pageRoute("/chats");
        // } else {
        //   setIsLoading(false);
        //   toast.error("Invalid Credentials!");
        //   setFormData({ ...formData, password: "" });
        // }
        if (data?.token) {
          localStorage.setItem("userToken", data.token)
          toast.success("Succesfully Login!")
          setIsLoading(false)
          pageRoute("/chats")
        }
        else {
          setIsLoading(false)
          toast.error("Invalid Credentials!")
          setFormData({ ...formData, password: "" })
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
        toast.error("Something went wrong while logging in.");
      }
    } else {
      setIsLoading(false)
      toast.warning("Provide valid credentials!");
      setFormData(defaultData);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    const isValid = async () => {
      const data = await validUser()
      if (data?.user) {
        window.location.href = "/chats"
      }

    }
    isValid()
  }, [])
  return (
    <>

      <div className='bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className='w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 relative'>
          <div className='absolute -top-5 left-0'>
            <h3 className=' text-[25px] font-bold tracking-wider text-[#fff]'>Login to your Account</h3>
            <p className='text-[#fff] text-[14px] tracking-wider font-medium'>Don't have Account ? <Link className='text-[rgba(0,195,154,1)] underline' to="/register">Sign up</Link></p>
          </div>
          <form className='flex flex-col gap-y-8 mt-[15%]' onSubmit={formSubmit}>
            <div>
              <input className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]" onChange={handleOnChange} name="email" type="text" placeholder='Email' value={formData.email} required />

            </div>
            <div className='relative'>

              <input className='w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]' onChange={handleOnChange} type={showPass ? "text" : "password"} name="password" placeholder='Password' value={formData.password} required />
              {
                !showPass ? <button type='button'><BsEye onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' /></button> : <button type='button'> <BsEyeSlash onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' /></button>
              }
            </div>
            <button style={{ background: "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)" }} className='w-[100%]  sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative' type='submit'>
              <div style={{ display: isLoading ? "" : "none" }} className='absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]'>

                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json" background="transparent" speed="1" style={{ width: "200px", height: "160px" }} loop autoplay></lottie-player>
              </div>
              <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Login</p>
            </button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Login