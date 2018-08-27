import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import axios from './axios';
import HomeScreen from './containers/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import DetailScreen from './containers/DetailScreen';

// import DetailScreen from './containers/DetailScreen';

class App extends Component {
  //state 
  state = {
    user: {},
    isLogin: null
  }

  changeIsLogin = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  }

  isBeginLogin = () => {
    axios
      .get("/api/isLogin")
      .then(data => {
        if (data.data.success === 0)
          this.setState({ isLogin: false });
        else
          this.setState({ isLogin: true, user: data.data.user.userFound });
      })
      .catch(err => console.log(err));
  }

  getUser = userId => {
    axios
      .get('/api/users/' + userId)
      .then(data => {
        this.setState({ user: data.data.user });
      })
      .catch(err => console.log(err));
    return this.state.user;
  }


  render() {
    if (this.state.isLogin === null) {
      return (
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" render={props => {
              return <HomeScreen {...props} user={this.state.user} getUser={this.getUser} changeIsLogin={this.changeIsLogin} isLogin={this.state.isLogin} isBeginLogin={this.isBeginLogin}/>
            }} />
            <Route path="/images/:imageId" render={props => {
              return <DetailScreen {...props} user={this.state.user} getUser={this.getUser} />
            }} />
          </div>
        </BrowserRouter>
      );
    } else

      if (this.state.isLogin === false) {
        return <Login changeIsLogin={this.changeIsLogin} getUser={this.getUser} />
      }
      else
        if (this.state.isLogin === true) {
          return (
            <BrowserRouter>
              <div className="App">
                <Route exact path="/" render={props => {
                  return <HomeScreen {...props} user={this.state.user} getUser={this.getUser} changeIsLogin={this.changeIsLogin} isLogin={this.state.isLogin} isBeginLogin={this.isBeginLogin} />
                }} />
                <Route path="/images/:imageId" render={props => {
                  return <DetailScreen {...props} user={this.state.user} getUser={this.getUser}/>
                }} />
              </div>
            </BrowserRouter>
          );
        }
    return null;
  }
}

export default App;


