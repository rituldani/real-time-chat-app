// import React from 'react'
// import User from './User'
// import useGetAllUsers from '../../context/useGetAllUsers';
// function Users() {
//     const [allUsers, loading] = useGetAllUsers(); 
//     console.log(allUsers);
//   return (
//     <div>
//       {
//         allUsers.map((user, index) => (
//           <User key={index} user={user}/>
//         ))
//       }
//     </div>
//   );
// }

// export default Users


import React from 'react';
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!Array.isArray(allUsers)) {
    return <div>No users found or you are not authorized.</div>;
  }

  return (
    <div>
      {allUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>

    // <div>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    //   <User/>
    // </div>
  );
}

export default Users;
