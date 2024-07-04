import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import View from '../components/View'

function Dashboard() {
  const[user,setUser] = useState("")
  useEffect(()=>{
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")).username)
    } else {
      setUser("")
    }
    
  },[])

  return (
    <>
      <Header insideDashboard = {true} />
      <div style={{marginTop:"150px"}} className="container-fluid ">
        <div className="row mt-3">
          <div className="col-lg-8">
            <h1>Welcome <span className='text-warning'>{user.split(" ")[0]}</span></h1>
            <View/>
          </div>
          <div className="col-lg-4">
            <Profile/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
