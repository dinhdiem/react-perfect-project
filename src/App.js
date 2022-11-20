import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import React from "react";

const App = () => {
  return <div className="btn btn-primary">Hello world</div>;
};

export default App;
