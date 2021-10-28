import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../src/components/Login';
import NavigationDrawer from '../src/components/NavigationDrawer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.signOff = this.signOff.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem('isLoggedIn')) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  async signOff() {
    await localStorage.clear();
    await localStorage.setItem('isLoggedIn', false)

    this.setState({ isLoggedIn: false });
  }

  signIn() {
    this.setState({ isLoggedIn: true });
  }

  render() {

    const LoginView = () => (
      <Login signIn={this.signIn} />
    );

    const NavigationDrawerView = () => (
      <NavigationDrawer signOff={this.signOff}/>
    );

    return (
      <Router>
        <div className="App">
            <div>
              {this.state.isLoggedIn && localStorage.getItem("isLoggedIn") === "true" ? <Redirect to="/rutina" /> : <Redirect to="/" />}
              <Switch>
                <Route exact path="/" component={LoginView} />
                <Route exact path="/rutina" component={NavigationDrawerView} />
              </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;