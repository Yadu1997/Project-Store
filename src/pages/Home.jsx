import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import homeImg from '../assets/project.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const [homeProject,setHomeProjects] = useState([])
  const navigate = useNavigate()

  // console.log(homeProject);

  useEffect(()=>{
    getHomeProjects()
  },[])

  const getHomeProjects = async () =>{
    try {
      const result = await homeProjectAPI()
      // console.log(result);
      if (result.status==200) {
        setHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleProject = () =>{
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      toast.warning("Please login to explore")
    }
  }

  return (
    <>
     <div style={{height:"100vh"}} className="d-lg-flex justify-content-center align-items-center rounded shadow p-5 w-100 ">
        <div className='container'>
            <div className="row align-items-center">
                
                <div className="col-lg-6 p-2">
                    <h1 style={{fontSize:"80px"}}> <i className="fa-solid fa-diagram-project"></i> Project Store</h1>
                    <p style={{textAlign:"justify"}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aliquid laboriosam adipisci nihil. Earum veritatis ea nulla dolores. Soluta nisi laudantium ipsam quae laboriosam fugiat, molestias a eveniet pariatur impedit?
                    </p>
                    <div className='d-flex justify-content-end'>
                      {
                        sessionStorage.getItem("token")?
                        <Link to={'/dashboard'} className='btn btn-success' >Manage Your Projects</Link>:
                      <Link to={'/login'} className='btn btn-success' >Start to Expolore</Link>
                      }</div>
                </div>
                <div className="col"></div>
                <div className="col-lg-5 p-2">
                    <img className='img-fluid' src={homeImg} alt="img" />
                </div>
            </div>
        </div>
     </div> 
     <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore Our Projects</h1>
        <marquee>
            <div className="d-lg-flex">
                {
                  homeProject?.length>0 &&
                  homeProject?.map(project=>(
                    <div key={project?._id} className="me-5">
                    <ProjectCard displayData={project}/>
                </div>
                  ))
                  
                }
            </div>
        </marquee>
        <button onClick={handleProject} className='btn btn-link mt-3'>Click Here to View More Projects...</button>
     </div>
     <div className="d-flex flex-column justify-content-center align-items-center my-5">
        <div><h1 className=''>Our Testimonials</h1></div>
        <div className='container d-lg-flex justify-content-evenly align-items-center mt-5 w-100'>
        <Card style={{ width: '18rem'}}>
          <Card.Body>
            <Card.Title className='d-flex justify-content-center '><img width={"60px"} height={'60px'} variant="top" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" /></Card.Title>
             <div className='d-flex justify-content-center align-items-center flex-column'>
            <h3>David miller</h3>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
            </div>
        </div>
        <Card.Text>
          <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
      </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center '><img width={"60px"} height={'60px'} variant="top" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" /></Card.Title>
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h3>Miller</h3>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
            </div>
        </div>
        <Card.Text>
          <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
      </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center '><img width={"60px"} height={'60px'} variant="top" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" /></Card.Title>
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h3>David</h3>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
                <div className="fa-solid fa-star text-warning"></div>
            </div>
        </div>
        <Card.Text>
          <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
          </p>
        </Card.Text>
      </Card.Body>
        </Card>
        </div>
     </div>
     <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Home
