import React, { useState, useEffect } from "react";
import { Button, CardText, Col, Row, InputGroup, FormControl } from "react-bootstrap";
import TextBarBehavior from "./TextBarBahavior";

export default function ViewTasks(props) {

  const [addSearch, setAddSearch] = useState("add")

  return (
    <div className="mt-5" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={11} xl={9} className="d-flex flex-column flex-md-row justify-content-center flex-wrap mb-5">
          <Button variant="warning" className="m-2" onClick={() => props.onFetch("Toutes")}>
            Toutes
          </Button>
          <Button variant="secondary" className="m-2" onClick={() => props.onFetch("A faire")}>
            A faire
          </Button>
          <Button variant="secondary" className="m-2" onClick={() => props.onFetch("Finies")}>
            Finies
          </Button>
          <div className="w-100 d-md-none"></div> {/* Break line only on xs to sm */}
          <CardText className="m-2 align-self-center ">
            {props.remainingTasks} tâches restantes
          </CardText>
          <Button variant="info" className="m-2" onClick={() => setAddSearch("add")}>
            Ajouter
          </Button>
          <Button variant="secondary" className="m-2" onClick={() => setAddSearch("search")}>
            Chercher
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} xl={6}>
          {props.tasks}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <TextBarBehavior taskList={props.taskList}  addSearch={addSearch}></TextBarBehavior>
      </Row>
    </div>
  );
}
