import React, { useState, useEffect } from "react";
import "../styling/AdminPanel.css"
import QuestionService from "../services/QuestionService"
import Question from "../components/Question";
import axios from "axios"



function AdminPanel() {
    const [allquestions, setAllQuestions] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:44348/api/question')
        .then(function (response) {
          setAllQuestions(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, []);
    
    return (
        <div className="">
            {allquestions.map((question, idx) => (
                    <Question key={question.id} question={question}  />
                ))}
            </div>
    );
}
export default AdminPanel