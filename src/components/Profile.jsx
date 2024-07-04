import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import pro from "../assets/Pro.png"
import SERVER_URL from '../services/serverurl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../services/allAPI';
function Profile() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    if (sessionStorage.getItem("user")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profilePic)
    }
  },[open])

  useEffect(()=>{
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleProfileUpdate = async () =>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if (github && linkedin) {
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type" : preview?"multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        // api call
        try {
          const result = await editUserAPI(reqBody,reqHeader)
          if (result.status==200) {
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))
          } else {
            console.log(result);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.info("please fill the form completely")
    }
  }


  return (
    <>
      <div className='d-flex justify-content-evenly'>  
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open} className='btn fw-bolder text-warning'><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row align-items-center justify-content-center shadow rounded p-3' id="example-collapse-text">
         <label className='text-center mb-2'>
          <input type="file" style={{display:"none"}} onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} />

          { 
           existingImg == ""?
            <img className='rounded-circle' width={"200px"} height={"200px"} src={preview?preview:pro} alt="" />
            :
            <img className='rounded-circle' width={"200px"} height={"200px"} src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
          }

         </label>
         <div className="mb-2">
          <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" placeholder='GitHub' className='form-control'/>
         </div>
         <div className="mb-2">
          <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" placeholder='Linked In' className='form-control'/>
         </div>
         <div className="d-grid">
          <button onClick={handleProfileUpdate} className='btn btn-primary'>Update Profile</button>
         </div>
        </div>
      </Collapse>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Profile
