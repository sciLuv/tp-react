import React, { useState } from "react"
import { Button, CardText, Col, Row, InputGroup, FormControl } from "react-bootstrap";

export default function TextBarBehavior(props){
    const [taskToSave, setTaskToSave] = useState("")
    const [searchedTask, setSearchedTask] = useState("")
    

    function fetchAddTask(){
        fetch("http://localhost:8080/tasks/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "text": text,
              "isChecked": false, // Assurez-vous que cela bascule l'état isChecked
            }),
          }).then(() => {
            // Après la mise à jour, incrémentez le compteur pour déclencher une nouvelle récupération des tâches
            setUpdateCounter(prev => prev + 1);
          });
    }

    function buttonBehavior(){
      {props.addSearch === 'add' ? 
      fetchAddTask()
      : 
      null
      }
    }

    return (
        <div>
          <Col xs={10} md={8} xl={6} className="d-flex align-items-stretch">
          <input type="text" 
                 className="form-control me-2" 
                 placeholder="Nouvelle tâche"
                 onClick={() => {console.log(props.taskList);}}/>
          <Button 
          variant={props.addSearch === 'add' ? 'success' : 'primary'}
          onClick={() => buttonBehavior()}
          >
            {props.addSearch == "add" ? "Ajouter" : "Effacer"}
          </Button>
        </Col>
        </div>
    )
}
