// import React, { useState } from 'react'
// import Left from './Leftpart/Left'
// import Right from './Rightpart/Right'

// function Home() {
//   const [showDrawer, setShowDrawer] = useState(false);
//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-zinc-800">
//       <div className="h-screen rounded-xl shadow-lg w-[90%] text-center flex">
//         <Left />
//         <Right />
//       </div>
//     </div>
//   )
// }


// export default Home


import React, { useState } from 'react';
import Left from './Leftpart/Left';
import Right from './Rightpart/Right';
import { AiOutlineMenu } from "react-icons/ai";

function Home() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-800 relative overflow-hidden">

      {/* Hamburger button - shown on small screens only */}
      <button
        className="absolute top-4 right-4 z-50 md:hidden bg-zinc-700 text-white p-2 rounded"
        onClick={() => setShowDrawer(true)}
      >
        <AiOutlineMenu />
      </button>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-zinc-700 w-3/4 max-w-xs transform transition-transform duration-300 ease-in-out md:hidden ${
          showDrawer ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setShowDrawer(false)}
        >
          ✕
        </button>
        <Left />
      </div>

      {/* Main chat layout */}
      <div className="h-screen rounded-xl shadow-lg w-[90%] text-center flex overflow-hidden">
        {/* Show sidebar only on md and above */}
        <div className="hidden md:block">
          <Left />
        </div>
        <div className="flex-1">
          <Right />
        </div>
      </div>
    </div>
  );
}

export default Home;
