import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
//import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import FieldLevelValidationForm from "./FieldLevelValidationForm";
import Search from './Search';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Registration Form</h2>
      <FieldLevelValidationForm onSubmit={showResults} />
      <BrowserRouter>
      <div>
      {/* <Route path="/search" component={Search} /> */}
      </div>
      </BrowserRouter>
      {/* <Values form="fieldLevelValidation" /> */}
    </div>                                                                            
  </Provider>,
  rootEl
);
