import React, { Component } from "react";

import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import  dr from "./dr";
import ds from "./ds";
import dc from "./dc";

class App extends Component {

  render() {
    return (
        <Router>
            <div className="App">
                <Route path="/" component={Home}/>
                <Route path="/dr" component={dr}/>
                <Route path="/ds" component={ds}/>
                <Route path="/dc" component={dc}/>
            </div>
        </Router>
    );
  };
}

export default App;
