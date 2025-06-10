import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import User from './User';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { IoMdLogOut } from "react-icons/io"
import Users from './Users';
import axios from 'axios';
import toast from 'react-hot-toast';
// import jwt from "jsonwebtoken"
import Cookies from 'js-cookie';
import useGetAllUsers from '../../context/useGetAllUsers';
import useConversation from '../../zustand/useConversation';

function Left() {
  const [showProfile, setShowProfile] = useState(false)
  const [loading, setLoading] = useState(false)
  // const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  // const username = authUser.user.fullname || authUser.newUser.fullname;

   const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  const user = authUser?.user || authUser?.newUser;

  const username = user?.fullname;
  const email = user?.email;

  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const getUserAvatarNumber = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 100; // Returns a number between 0-99
  };
  const number = getUserAvatarNumber(email);
  const gender = "women"; // or "women" or randomize based on your data
  const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;

  // https://i.pinimg.com/originals/8d/e4/1f/8de41f44d4f422b21b503d7bb1f298ce.jpg

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      console.log("logged out");
      window.location.reload();
    }
    catch (error) {
      console.log("Error in Logout:", error);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    )
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
      setSearch("");
    }
  }


  return (
    <div className="w-[100%] h-[100%] bg-zinc-700 text-white py-3 border border-zinc-800">
      <div className="flex">
        {
          !showProfile
            ?
            <div className="w-[100%] h-[100%]">

              {/* header */}
              <div className="h-[45px] w-[100%] px-4 flex text-center justify-between">
                <div className="flex items-center">
                  <a className='flex items-center relative h-[90px]' href='/'>
                    <h3 className='text-[20px] text-[#1f2228] dark:text-[#E5E7EB] font-body font-extrabold tracking-wider'>Messages</h3>
                  </a>
                </div>
                <div>
                  <button onClick={() => setShowProfile(true)}>
                    <img className="w-10 m-2 rounded-full" src={avatarUrl} alt="Profile" />
                    {/* <img className="w-10 m-2 rounded-full" src="https://i.pinimg.com/originals/8d/e4/1f/8de41f44d4f422b21b503d7bb1f298ce.jpg" alt="#" /> */}
                  </button>
                </div>
              </div>

              {/* search bar */}
              <form onSubmit={handleSearch}>
                <div className="flex items-center shadow-lg bg-zinc-800 rounded-lg m-4 px-2">
                  {/* <i className="fas fa-search text-white h-3 w-6"></i> */}
                  <GoSearch />
                  <input
                    type="text"
                    placeholder="Search"
                    className=" w-full p-2 bg-transparent outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>

              {/* user chat */}
              <div className="flex-1 overflow-y-auto" style={{ maxHeight: " calc(81vh)" }}>
                <Users />
              </div>

            </div>
            :
            <div className="w-[100%]">
              <div className="flex gap-2 h-[80px] items-center">
                <ArrowLeftIcon onClick={() => setShowProfile(false)} className="w-7 text-zinc-900 dark:text-white font-extrabold cursor-pointer" />
                <h1 className="text-2xl">Profile</h1>
              </div>
              <div className="flex items-center justify-center w-[100%]">
                <img className="w-50 m-2 rounded-full items-center" src={avatarUrl} alt="#" />
              </div>
              <div className="flex flex-col items-start w-[100%] p-4">
                <p className="text-green-700">Username</p>
                <h1 className="text-xl shadow-md w-[100%] text-start">{username}</h1>
              </div>
              <div className="flex flex-col items-start w-[100%] p-4">
                <p className="text-green-700">Bio</p>
                <h1 className="text-xl shadow-md w-[100%] text-start">Available</h1>
              </div>
              <div className='flex items-center justify-center mt-5 cursor-pointer shadow-2xl'>
                <IoMdLogOut className='text-[#e44d4d] w-[27px] h-[23px]' onClick={handleLogout} />
                <h6 className='text-[17px] text-[#e44d4d] font-semibold'>Logout</h6>
              </div>
            </div>
        }
      </div>
    </div>
  )
}
export default Left