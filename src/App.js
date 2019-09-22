import React, { Component } from 'react';
import './Styles/main.scss';
import Lens from './Components/Lens/Lens';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(
      `%c Lens %c  running on ${process.env.NODE_ENV} environment`,
      'font-weight: bold; font-size: 50px; color:#830e3c ; text-shadow: 3px 3px 0 rgb(220,220,220)',
      'color: #fff; font-weight: bold; padding: 20px 0; font-size: 13px; '
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="app-container animated-bg">
          <Lens/>
        </div>
      </React.Fragment>
    );
  }
}
