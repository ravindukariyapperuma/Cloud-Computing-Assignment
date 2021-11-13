import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Process from "./Process"

const axios = require("axios");

class Stage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/store")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            stores: response.data.map((store) => store),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:5000/store")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            stores: response.data.map((store) => store),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ marginTop: "5%" }}>
        <div class="container">
          <Process stores={this.state.stores} />
        </div>
      </div>
    );
  }
}

export default Stage;
