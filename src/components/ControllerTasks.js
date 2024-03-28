import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ViewTasks from "./ViewTasks";
import {Button} from "react-bootstrap";

export function ControllerTasks() {
  const [tasks, setTasks] = useState([]);
  const [clickedButton, setClickedButton] = useState("Toutes");
  const [updateCounter, setUpdateCounter] = useState(0); // Ajout d'un compteur pour suivre les mises à jour
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [taskList, setTaskList] = useState([])



  function fetchDelete(id){
    console.log(taskList);
    fetch("http://localhost:8080/tasks/" + id, {
      method: "DELETE",

    }).then(() => {
      let array = taskList
      array.splice(id, id+1);
      setTaskList(array)
      console.log(taskList);
      // Après la mise à jour, incrémentez le compteur pour déclencher une nouvelle récupération des tâches
      setUpdateCounter(prev => prev + 1);
    });
  }
  function fetchCheckTask(id, text, isChecked) {
    console.log(taskList);
    fetch("http://localhost:8080/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
        "text": text,
        "isChecked": !isChecked, // Assurez-vous que cela bascule l'état isChecked
      }),
    })
    .then(response => response.json())
      .then(json => {
        let array = taskList
        array.splice(id, id+1, json);
        setTaskList(array)
        console.log(taskList);
        setUpdateCounter(prev => prev + 1);
      })
  }

  function fetchTasks(buttonName = clickedButton) {
    console.log(taskList);
    setClickedButton(buttonName)
    setTasks("Chargement...");
    fetch("http://localhost:8080/tasks")
      .then(response => response.json())
      .then(json => {
        let array = []
        for (let index = 0; index < json.length; index++) {
          array.push(json[index])

        }
        setTaskList(array)
        setClickedButton(buttonName);
        const unCheckedTasksCount = json.filter(task => !task.isChecked).length;
        setRemainingTasks(unCheckedTasksCount);
        // Afficher toutes les tâches

        if(buttonName === "Toutes" || buttonName === undefined) {
          console.log("je suis dans toutes")
          setTasks(
            () => {
              const newTasks = [];
              for (let i = 0; i < json.length; i++) {
                newTasks.push(
                  <li key={nanoid()} className="w-100 d-flex mb-3">
                    <span className={`w-100 ${json[i].isChecked ? 'text-decoration-line-through' : ''}` }> {json[i].text}</span>
                    <Button className={"ms-3"} onClick={() => fetchDelete(json[i].id)}>
                      <i className="fa-solid fa-trash-can" ></i>
                    </Button>
                  </li>
                );
              }
              return <ul>{newTasks}</ul>
            }
          );
        }

        // Afficher les tâches à faire

        else if(buttonName === "A faire") {
          console.log("je suis dans a faire")
          setTasks(
            () => {
              const newTasks = [];
              for (let i = 0; i < json.length; i++) {
                newTasks.push(
                  json[i].isChecked ?
                    null
                    : <li
                    key={nanoid()}
                    className={`w-100 d-flex mb-3 align-items-center ${json[i].isChecked ? 'display-none' : ''}`}
                    onClick={() => fetchCheckTask(json[i].id, json[i].text, json[i].isChecked)}
                    style={{ cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'ghostwhite'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span className="w-100"> {json[i].text}</span>
                    <Button className="ms-3" onClick={(e) => e.stopPropagation()}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </li>
              )
                ;
              }
              return <ul>{newTasks}</ul>
            }
          );

          // Afficher les tâches finies

        } else if(buttonName === "Finies") {
          console.log("je suis dans finies")
          setTasks(
            () => {
              const newTasks = [];
              for (let i = 0; i < json.length; i++) {
                newTasks.push(
                  json[i].isChecked ?
                    <li key={nanoid()} className="w-100 d-flex mb-3">
                      <span className={`w-100`}> {json[i].text}</span>
                      <Button className={"ms-3"}>
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </li>
                    : null
                )
                ;
              }
              return <ul>{newTasks}</ul>
            }
          );
        }
      });
  }

  useEffect(() => {
    if (clickedButton) {  // Assurez-vous que clickedButton n'est pas null ou undefined
      fetchTasks(clickedButton);
    }
  }, [clickedButton, updateCounter]);  // Dépend de clickedButton et updateCounter
   // Ajoutez updateCounter ici
  return (
    <div>
      <ViewTasks onFetch={fetchTasks} tasks={tasks} taskList={taskList}  remainingTasks={remainingTasks}/>
    </div>
  );
}



