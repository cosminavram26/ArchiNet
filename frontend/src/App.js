import React, { Component } from 'react';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

    class App extends Component {

      constructor(props) {
        super(props);
        this.state = {
          displayed_form : '',
          logged_in : localStorage.getItem('token') ? true : false,
          username : '',
          users : []
        };
      }
      
      componentDidMount() {
        if(this.state.logged_in) {
          fetch('http://localhost:8000/core/current_user/', {
            headers : {
              Authorization : `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res => res.json())
          .then(json => {
            this.setState({username : json.username});
          });
          fetch('http://localhost:8000/core/current_user/predict/',{
            headers : {
              Authorization : `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res=>res.json())
          .then((data)=>{
          this.setState({users: data})
          })
          .catch(console.log)
        }
      }

      generate = () => {
        fetch('http://localhost:8000/core/current_user/predict/',{
            headers : {
              Authorization : `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res=>res.json())
          .then((data)=>{
          this.setState({users: data})
          })
          .catch(console.log)
      }

      handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token',json.token);
          this.setState({
            logged_in : true,
            displayed_form : '',
            username: json.user.username
          });
        });
      } 

      handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
        });
      }

      handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
      };

      display_form = form => {
        this.setState({
          displayed_form: form
        });
      };

      render() {
        let form;
        switch (this.state.displayed_form) {
          case 'login':
            form = <LoginForm handle_login={this.handle_login} />
            break;

          case 'signup':
            form = <SignupForm handle_signup={this.handle_signup} />
            break;
          default:
            form = null;
        }

        return (
          <div className="App">
            <Navigation
              logged_in = {this.state.logged_in}
              display_form = {this.display_form}
              handle_logout = {this.handle_logout}
              generate = {this.generate}
              users = {this.state.users}
            />
            {form}
            <h3>
              {this.state.logged_in
                ? 
                 `Hello, ${this.state.username}`
                : `Please Log In`
              }
            </h3>
          </div>
        );
      }
    }

    export default App;
