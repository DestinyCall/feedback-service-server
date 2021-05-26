import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Feedback Service</h1>
        Collect Feedback of your services!
      </div>
    );
  }
}

export default Landing;
