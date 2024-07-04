import React, { useContext, useState } from 'react'
import login from "../assets/Login.png"
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/AuthContext';


function Auth({insideRegister}) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })

  const [logged,setLogged] = useState(false)

  // register
  const handleRegister = async(e) =>{
    e.preventDefault()
    if (userData.username && userData.email && userData.password) {
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status==200) {
          toast.warning(`Welcome ${result?.data?.username}. Please Login to Explore`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')
        }else{
          if (result.response.status==406) {
            toast.error(result.response.data)
            setUserData({username:"",email:"",password:""})
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Please Enter The Values")
    }
  }

  // login
  const handleLogin = async(e)=>{
    e.preventDefault()

    if (userData.email && userData.password) {
      try {
        const result = await loginAPI(userData)
        console.log(result);
        if (result.status==200) {
          setLogged(true)
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.warning(`welcome ${result.data.user.username}...`)
          
          setTimeout(() => {
            navigate('/')
            setUserData({
              username:"",email:"",password:""
            })
            setLogged(false)
          }, 2000);
        } else {
          if (result.response.status==404) {
            toast.error(result.response.data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Please Enter The Values")
    }

  }

  // console.log(userData);

  return (
    <div style={{width:"100%",height:"100vh"}} className='d-flex justify-content-center align-items-center '>
      <div className='container w-75'>
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={login} alt="Login" />
            </div>
            <div className="col-lg-6">
               <h1 className='fw-bolder mt-2'><i className="fa-solid fa-diagram-project"></i> Project Store</h1>
               <h5 className='fw-bolder mt-2'>Sign{insideRegister?"Up":"In"} to your Account</h5>  
               <Form>
                {
                  insideRegister &&

                  <FloatingLabel controlId="floatingInputName" label="userName" className="mb-3">
                <Form.Control value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} type="text" placeholder="User Name" />
                 </FloatingLabel>

                }
               <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
                 </FloatingLabel>
                   <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
                    </FloatingLabel>

                      {
                        insideRegister?
                          <div className="mt-3">
                            <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                            <p>
                              Already have an Account ? Click here to <Link to={'/login'}>Login</Link>
                            </p>
                          </div>
                        :
                        <div className="mt-3">
                            <button onClick={handleLogin} className='btn btn-primary d-flex justify-content-center align-items-center mb-2 me-2'>Login { logged &&
                              <Spinner className='ms-1' animation="grow" variant="warning" />
                              }</button>
                            
                            <p>
                              New User ? Click here to <Link to={'/register'}>Register</Link>
                            </p>
                          </div>
                      }

               </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  )
}

export default Auth
