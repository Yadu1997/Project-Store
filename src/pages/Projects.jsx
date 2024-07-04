import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

function Projects() {

  const [allProjects,setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")

  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async() =>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      // api call
      try {
        const result = await allProjectAPI(searchKey,reqHeader)
        console.log(result);
        if (result.status==200) {
          setAllProjects(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
     <Header/> 
     <div style={{marginTop:"200px"}} className="container-fluid">
        <div className="d-md-flex justify-content-between">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" className='form-control w-25' placeholder='Search By Language Used' />
        </div>
        <div className='container'>
          <Row className='my-5'>
            { 
             allProjects?.length>0 ?
             allProjects?.map(project=>(
              <Col key={project?._id} className='mb-5' sm={12} md={6} lg={4}  >
            <ProjectCard displayData={project}/>
            </Col>
             ))
              
            :
            <div className='fw-bolder text-danger m-5 text-center'> 
              Projects Not Found
            </div>
            }
          </Row>
        </div>
     </div>
    </>
  )
}

export default Projects
