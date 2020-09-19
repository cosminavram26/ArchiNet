import React from 'react'
const Users = ({ users }) => {
  return (
    <div>
      <center><h1>User's buildings</h1></center>
      {users.map((user) => (
        <div key={user.username} class="card">
          <div class="card-body">
            <h5 class="card-title">{user.username}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
            <img src={process.env.PUBLIC_URL + `${user.img}`} alt={"Imagine generata"} /> 
          </div>
        </div>
      ))}
    </div>
  )
};

export default Users