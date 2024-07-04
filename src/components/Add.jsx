import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from "../assets/Upload.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';

 function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [imagePreview,setImagePreview] = useState(uploadImg)
  const [imageStatus,setImageStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    title:"",languages:"",github:"",website:"",overview:"",projectIMG:""
  })

  // console.log(projectDetails);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title:"",languages:"",github:"",website:"",overview:"",projectIMG:""
    })
  }
  const handleShow = () => setShow(true);


  useEffect(()=>{
    if (projectDetails.projectIMG.type == "image/png" || projectDetails.projectIMG.type == "image/jpg" || projectDetails.projectIMG.type == "image/jpeg" ) {
      setImageStatus(true)
      setImagePreview(URL.createObjectURL(projectDetails.projectIMG))
    } else {
      setImageStatus(false)
      setProjectDetails({...projectDetails,projectIMG : ""})
      setImagePreview(uploadImg)
    }
  },[projectDetails.projectIMG])


  const handelAddProject = async() =>{
    const {title,languages,github,website,overview,projectIMG} = projectDetails
    if (projectDetails.title && projectDetails.languages && projectDetails.github && projectDetails.overview && projectDetails.projectIMG && projectDetails.website) {
      
      // reqBody creation
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectIMG",projectIMG)


    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`
      }

      // api call
      try {
        const result = await addProjectAPI(reqBody,reqHeader)
        // console.log(result);
        if (result.status==200) {
          handleClose()
          // toast.info("Project added sucessfully")
          setAddResponse(result)
        } else {
          toast.warning(result.response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    } else {
      toast.info("Please Fill The Form Completely")
    }
  }

  return (
    <>
     <button onClick={handleShow} className='btn btn-primary'> <i className="fa-solid fa-plus"></i> Add Projects</button> 


     <Modal size='xl' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4 d-lg-flex flex-column align-items-center justify-content-center">
              <label>
              <input onChange={e=>setProjectDetails({...projectDetails,projectIMG:e.target.files[0]})} type="file" style={{display:"none"}} />
              <img className='mb-2 ' width={'100%'} height={'200px'} src={imagePreview} alt="" />
              </label>
              {
               !imageStatus &&
              <div>
                <p className='text-warning fw-bolder'>*(.jpeg  .jpg  .png)</p>
              </div> 
              }
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='project title' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} />
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Languages Used In Project' value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} />
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='GitHub Link' value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} />
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Live link' value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} />
              </div>
            </div>
          </div>
          <div>
            <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handelAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Add
