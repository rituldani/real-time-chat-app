import React from 'react'
import { useForm } from "react-hook-form"
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const [authUser, setAuthUser] = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // const onSubmit = (data) => console.log(data)
    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, userInfo, {
                withCredentials: true, // important to receive cookie!
            });
            console.log(response.data);
            if (response.data) {
                toast.success("Login successfully");
            }
            // console.log(response.data.token)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            setAuthUser(response.data);
        } catch (error) {
            if (error.response) {
                toast.error("Error: " + error.response.data.error)
            }
        }
    };

    return (
        <div className="bg-gray-900 text-gray-900 dark:text-white h-screen flex flex-col items-center justify-center ">
            <div className="flex flex-col items-center justify-center gap-4 border border-slate-700 px-10 py-6 rounded-2xl shadow-2xl">
                <h1 className="text-2xl">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto flex flex-col gap-3 w-[300px]">
                    <div className="flex p-2">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                        </span>
                        <input {...register("email", { required: true })} type="text" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                    </div>
                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}


                    <div className="flex p-2">
                        <span className="inline-flex items-center px-3 text-xl text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <RiLockPasswordFill />
                        </span>
                        <input {...register("password", { required: true })} type="password" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                    </div>
                    {errors.password && <span className="text-red-500 text-sm">This field is required</span>}


                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not registered yet?
                        {/* <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"> Register</a> */}
                        <Link to={"/signup"} className="text-blue-600 hover:underline dark:text-blue-500">
                            Register
                        </Link>
                    </label>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login
