import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/postsPage/Posts';
import SubmitTextPost from './pages/Posts/submitPost/SubmitTextPost';
import SubmitLinkPost from './pages/Posts/submitPost/SubmitLinkPost';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    axios.get('/api/user').then((response) => {
      console.log(response)
      if (response.data.user) {
        this.setState({
          isAuthenticated: true,
          user: response.data.user
        });
      }
    });
  }

  logout() {
    axios.get('/api/logout').then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top elegant-color-dark">
              <a className="navbar-brand" href="/">FORUM'd</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                      </li>
                      <li className="nav-item">
                        <a href="/posts" className="nav-link">Posts</a>
                      </li>
                      <li className="nav-item">
                        {this.state.user
                          ? <a onClick={this.logout} className="nav-link">Logout</a>
                          : <a href="/login" className="nav-link">Login</a>
                        }
                      </li>
                  </ul>
              </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/posts" render={(props) => (
              <Posts {...props} update={true} />
            )}/>
            <Route exact path="/submitTextPost" component={SubmitTextPost}/>
            <Route exact path="/submitLinkPost" component={SubmitLinkPost}/>
            <Route exact path="/login" component={Login}/>
            <Route path="*" render={(props) => (
              <div className="container"><h1>404 Page Not Found</h1></div>
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;