import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Posts from './pages/Posts/postsPage/Posts';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      status: null
    }
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    axios.get('/api/user').then((response) => {
      if (response.data.user) {
        this.setState({
          user: response.data.user
        });
        //console.log(this.state.user);
      }
    });
  }

  logout() {
    axios.get('/api/logout').then((response) => {
      console.log(response);
      this.setState({
        status: 'You are logged out.'
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top elegant-color-dark">
              <a className="navbar-brand" href="/">FORUM'd</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <a href="/posts" className="nav-link">Trending</a>
                      </li>
                      {this.state.user && (
                      <li className="nav-item">
                        <Link className="nav-link" to='/profile'>
                          {this.state.user.username}
                        </Link>
                      </li>
                      )}
                      {!this.state.user && (
                      <li className="nav-item">
                        <a href="/register" className="nav-link"
                        data-toggle="modal" data-target="#registerModal">
                          Register
                        </a>
                      </li>
                      )}
                      {this.state.user
                        ? 
                      <li className="nav-item">
                        <a onClick={this.logout} href="/logout" className="nav-link">
                          Logout
                        </a>
                      </li>
                        : 
                      <div>
                        <li className="nav-item">
                          <a href="/login" className="nav-link"
                          data-toggle="modal" data-target="#loginModal">
                            Login
                          </a>
                        </li>
                      </div>
                      }
                  </ul>
              </div>
          </nav>
          <Login />
          <Register />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/profile" render={(props) => (
              this.state.user ? (
                <Profile user={this.state.user} {...props} />
              ) : (
                <Redirect to='/'/>
              )
            )}/>
            <Route path="/posts" render={(props) => (
              <Posts {...props} update={true} />
            )}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" render={() => (
                <Redirect to='/'/>
            )}/>
            <Route path='*' component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;