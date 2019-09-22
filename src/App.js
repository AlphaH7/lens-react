import React, { Component } from "react";
import "./Styles/main.scss";
import Lens from "./Components/Lens/Lens";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null
    };
  }

  componentDidMount() {
    console.log(
      `%c Lens %c  running on ${process.env.NODE_ENV} environment`,
      "font-weight: bold; font-size: 50px; color:#830e3c ; text-shadow: 3px 3px 0 rgb(220,220,220)",
      "color: #fff; font-weight: bold; padding: 20px 0; font-size: 13px; "
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-container gradient-bg">
          <h1> {"Lens"} </h1>
          <h2> {"An Ineractive search dropdown for react."} </h2>
          {this.state.selectedEntry === null ? (
            <div className="search-ctr">
              <Lens
                onOptionSelect={value => {
                  this.setState({ selectedEntry: value });
                }}
              />
            </div>
          ) : (
            <div className="details-card">
              <div
                className="close-icon"
                onClick={() => this.setState({ selectedEntry: null })}
              >
                {"x"}
              </div>
              <div className="id">
                <span>{"#"}</span>
                <div>{this.state.selectedEntry.id}</div>
              </div>
              <div>
                <span>{"Name -"}</span>
                {this.state.selectedEntry.name}
              </div>
              <div>
                <span>{"Items -"}</span>
                {this.state.selectedEntry.items.join(", ")}
              </div>
              <div>
                <span>{"Address -"}</span>
                {this.state.selectedEntry.address}
              </div>
              <div>
                <span>{"PIN -"}</span>
                {this.state.selectedEntry.pincode}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
