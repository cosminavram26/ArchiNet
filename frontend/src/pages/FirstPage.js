import React, { Component } from 'react';
import Users from '../components/Users';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = { users: props.users };
       }

    render() {
      return (
        <div>
          <Users users={this.state.users} />
          <button onClick={() => this.props.generate()}>
            Generate
          </button>
        </div>
      );
    }
  }

  export default FirstPage;
