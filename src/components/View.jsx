import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { removeProjectAPI, userProjectAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI'
function View() {

  const{addResponse,setAddResponse} = useContext(addResponseContext)
  const{editResponse,setEditRespose} = useContext(editResponseContext)
  const [userProjects,setUserProjects] = useState([])
  // console.log(userProjects);
  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

  const getUserProjects = async() =>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      // api call
      try {
        const result = await userProjectAPI(reqHeader)
        // console.log(result);
        if (result.status==200) {
          setUserProjects(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDeleteProject = async(pid) =>{

    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      try {
        const result = await removeProjectAPI(pid,reqHeader)
        if (result.status==200) {
          getUserProjects()
        }else{
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  }


  return (
    <>
     <div className="d-flex justify-content-between mt-2">
        <h2 className='text-warning'>All Projects</h2> 
        <div><Add/></div>
      </div>
      <div className="mt-2">
        {
          userProjects?.length>0 ?
          userProjects.map(projects=>(
            <div key={projects?._id} className="border rounded p-2 d-flex justify-content-between mb-3">
          <h3>{projects?.title}</h3>
          <div className="d-flex align-items-center">
            <div><Edit projects={projects}/></div>
            <div className='btn'>
              <a href={projects?.github} target='_blank'><i className='fa-brands fa-github'></i></a>
              </div>
              <button onClick={()=>handleDeleteProject(projects?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
          </div>
        </div>
          ))
          
        :
        <div className='fw-bolder text-danger '>
          No Projects Uploaded Yet.
        </div>
        }
      </div>
    </>
  )
}

export default View
