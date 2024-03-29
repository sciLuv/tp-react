import React, { useState } from "react"
import { Button, CardText, Col, Row, InputGroup, FormControl } from "react-bootstrap";

export default function TextBarBehavior(props){
    const [taskToSave, setTaskToSave] = useState("")
    const [searchedTask, setSearchedTask] = useState("")
    const [inputValue, setInputValue] = useState('');


  const handleChange = (event) => {
    setInputValue(event.target.value);
    {props.addSearch == 'add' ?
      null
      :
      searchTask(event.target.value)
    }
  };


  // Ajouter une tâche
    function fetchAddTask(text){
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
          props.onFetch()
          });
    }

    function buttonBehavior(){
      {props.addSearch == 'add' ?
      fetchAddTask(inputValue)
      :
      null
      }
    }

    function searchBarBehavior(inputValue){

    }

  function searchTask(text){
    const filteredTasks = props.taskList.filter(task => task.text.toLowerCase().includes(text.toLowerCase()));
    console.log(filteredTasks); // Affiche les tâches filtrées dans la console
  }


    return (
          <Col xs={10} md={8} xl={6} className="d-flex align-items-stretch">
          <input type="text"
                 className="form-control me-2"
                 placeholder="Nouvelle tâche"
                 value={inputValue}
                 onChange={handleChange}
          />
            <Button
          variant={props.addSearch === 'add' ? 'success' : 'primary'}
          onClick={() => {
            buttonBehavior(inputValue)
            setInputValue("")
          }}
          >
            {props.addSearch == "add" ? "Ajouter" : "Effacer"}
          </Button>
        </Col>
    )
}
