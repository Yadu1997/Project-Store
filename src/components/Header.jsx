import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContext'

function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const handelLogout = () =>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <div style={{zIndex:"10",height:"100px"}} className='w-100 position-fixed top-0 bg-dark'>
      <Navbar className="">
        <Container>
          <Navbar.Brand className='mt-5'>
            <Link className='fw-bolder' to={'/'} style={{textDecoration:"none", color:"white"}}> <h3><i className="fa-solid fa-diagram-project"></i> Project Store </h3></Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className="ms-auto">
              <button onClick={handelLogout} className='btn btn-link'>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
