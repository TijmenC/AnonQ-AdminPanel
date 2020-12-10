
import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Image, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios"
import "../styling/Question.css"

function Question({ question, refreshQuestions }) {

    const [show, setShow] = useState(false);
    const [date, setDate] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        axios.delete('https://localhost:44348/api/question/DeleteQuestionAndPolls/' + question.id)
        .then(function (response) {
            handleClose()
            refreshQuestions()
        })
        .catch(function (error) {
          console.log(error);
        })

    }

    function HumanDateTime(dates) {
        var date = new Date(dates + "Z");
        date = date.toUTCString().split(", ");
        date = date[1].slice(0, 17);
        setDate(date);
      }

    
      useEffect(() => {
        if (question.deletionTime != undefined) {
          HumanDateTime(question.deletionTime);
        }
      }, [question.deleteTime]);

    return (
        <>
            <div className="rounded container QuestionDiv">
                <Row>
                    <Col md="1">{question.id}</Col>
                    <Col md="1">{question.title}</Col>
                    <Col md="1">{question.tag}</Col>
                    <Col md="2">{date}</Col>
                    <Col md="1">{question.commentsEnabled.toString()}</Col>
                    <Col md="2"><Button onClick={handleShow}>Show Actions</Button></Col>
                </Row>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary"  onClick={handleDelete}>
                        Delete Question
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Question
