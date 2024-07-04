import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from "../assets/Upload.jpg"
import SERVER_URL from '../services/serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';

function Edit({projects}) {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const [projectDetails,setProjectDetails] = useState({
   id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectIMG:""
  })

  const [preview,setPreview] = useState("")
  const [imageStatus,setImageStatus] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectIMG:""
    })
  }

  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectIMG:""
    })
  }

  useEffect(()=>{
    if (projectDetails.projectIMG.type == "image/png" || projectDetails.projectIMG.type == "image/jpg" || projectDetails.projectIMG.type == "image/jpeg") {
      setPreview(URL.createObjectURL(projectDetails.projectIMG))
      setImageStatus(true)
    } else {
      setPreview("")
      setImageStatus(false)
      setProjectDetails({...projectDetails,projectIMG:""})
    }
  },[projectDetails.projectIMG])


  const handleUpdateProject = async() =>{
    const{id,title,languages,github,website,overview,projectIMG} = projectDetails

    if (title && languages && github && website && overview) {

      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectIMG",projectIMG):reqBody.append("projectIMG",projects.projectIMG)

       const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type" : preview?"multipart/form-data":"application/json",
        "Authorization" : `Bearer ${token}`
      }
    
      // Proceed to api call
      try {
        const result = await editProjectAPI(id,reqBody,reqHeader)
        console.log(result);
        if (result.status==200) {
          handleClose()
          setEditResponse(result)
        }else{
          console.log(result.response);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("Please fill the form completely")
    }
  }
}

  return (
    <>
   
    <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row align-items-center">
            <div className="col-lg-4 d-lg-flex flex-column align-items-center justify-content-center">
              <label>
              <input onChange={e=>setProjectDetails({...projectDetails,projectIMG:e.target.files[0]})} type="file" style={{display:"none"}} />
              <img className='mb-2 ' width={'100%'} height={'200px'} src={preview?preview:`${SERVER_URL}/uploads/${projects?.projectIMG}`} alt="" />
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
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Edit
