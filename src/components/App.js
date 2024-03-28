import React from "react";
import reactDom from "react-dom";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import {ControllerTasks, ControllerTasksToDo} from "./ControllerTasks";

export default function App() {

  return (
<div>
  <ControllerTasks />
</div>
  );
}
