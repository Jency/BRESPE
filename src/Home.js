import React, { Component } from "react";

import "./App.css";
import {Link} from "react-router-dom";

class Home extends Component {


  render() {
    return (
      <div className="App">
          <div>
              <Link to="/dr/" style={{color:'black'}}>
                  <div>Go to Data Requester Page</div>
              </Link>
              <Link to="/ds/" style={{color:'black'}}>
                  <div>Go to Data Subject Page</div>
              </Link>
              <Link to="/dc/" style={{color:'black'}}>
                  <div>Go to Data Controller Page</div>
              </Link>
          </div>

      </div>
    );
  };
}

export default Home;
