import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Container} from 'reactstrap';

import MainScreen from './components/MainScreen';
import PlayScreen from './components/PlayScreen';
import Header from './components/Header';


class App extends Component {
  state = {

  }

  render() {
    return (
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" render={props => {
            return <MainScreen {...props} getInfoValue={this.getInfoValue} />
          }} />
          <Route path="/api/game/:infoId" render={props => {
            return <PlayScreen {...props} info={this.state.info} />
          }} />

        </Switch>
      </Container>

    );
  }
}

export default App;
