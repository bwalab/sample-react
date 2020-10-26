import React from 'react';
import Dashboard from './components/Dashboard/Dasboard'
import Login from './components/Auth/LogIn'
import axiosInstance from "./components/Auth/axiosApi";
import axios from 'axios'



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      username: "",
      password: "",

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }



  handleSubmit(event) {
    const querystring = require('querystring')
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://beta.bwalab.net/api/api-token-auth/',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: querystring.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      axiosInstance.defaults.headers['Authorization'] = "Token " + response.data.token;
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('isLoggedIn', true);
      this.setState({ isLoggedIn: true })
    }).catch(function (error) {
      console.log('Error: ' + error)
    })
  }
  handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
    axiosInstance.defaults.headers['Authorization'] = null;
    this.setState({ isLoggedIn: false })
  }

  render() {

    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <Dashboard handleLogout={this.handleLogout} />
        </div>
      )
    }
    return (
      <div className="App">
        <Login handleChange={this.handleChange} loginStatus={this.state.isLoggedIn} handleSubmit={this.handleSubmit} username={this.state.username} password={this.state.password} />
      </div>
    )


  }
}
export default App;
