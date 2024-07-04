import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import SERVER_URL from '../services/serverurl';

function ProjectCard({displayData}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card style={{width:"300px",height:"300px"}} onClick={handleShow} className='shadow btn'>
     <Card.Img height={'100%'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectIMG}`} />
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectIMG}`} alt="title" />
            </div>
            <div className="col-6">
              <h3>{displayData?.title}</h3>
              <h6><span className='fw-bolder'>language Used</span> <span className='text-danger'>{displayData?.languages}</span> </h6>
              <p>
                {displayData?.overview}
              </p>
            </div>
          </div>
          <div className="float-start mt-2">
            <a className='btn me-2' href={displayData?.github} target='_blank'> <i className="fa-brands fa-github"></i> </a>
            <a className='btn' href={displayData?.website} target='_blank'> <i className="fa-solid fa-link"></i> </a>
            
          </div>
          </Modal.Body>      
      </Modal>

    </>
  )
}

export default ProjectCard
