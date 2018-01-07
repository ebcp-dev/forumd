import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';

import './Router.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Posts from './components/Posts/Posts';
import ViewPost from './components/Posts/viewPost/ViewPost';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import SubmitLinkPost from './components/Posts/submitPost/SubmitLinkPost';
import SubmitTextPost from './components/Posts/submitPost/SubmitTextPost';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authenticated: null
        }
        this.authenticateUser = this.authenticateUser.bind(this);
        this.loggedOut = this.loggedOut.bind(this);
    }

    componentWillMount() {
        this.authenticateUser();
    }

    loggedOut() {
        axios.get('/api/logout').then(response => {
            this.setState({
                user: {},
                authenticated: false
            });
            window.location.reload();
        });
    }

    authenticateUser() {
        axios.get('/api/user').then(response => {
            return this.setState({
                user: response.data.user,
                authenticated: true
            });
        }).catch(error => {
            return this.setState({
                user: {},
                authenticated: false
            });
        });
    }

    render() {
        //console.log(this.state);
        return (
            <Router>
                <div>
                    <nav className='navbar navbar-expand-sm navbar-dark elegant-color-dark'>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
                        aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon'></span></button>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>
                                        Posts
                                    </Link>
                                </li>
                                {this.state.user ? (
                                <li className='nav-item'>
                                    <Link className='nav-link' to={`/profile/${this.state.user.username}`}>
                                        {this.state.user.username}
                                    </Link>
                                </li>
                                ) : (
                                    <li className='nav-item'>
                                        <Link className='nav-link' data-toggle='modal' data-target='#registerModal' to='/register'>
                                        Register
                                        </Link>
                                    </li>
                                )}
                                {this.state.user ? (
                                <li className='nav-item'>
                                    <a className='nav-link' onClick={this.loggedOut}>
                                        Logout
                                    </a>
                                </li>
                                ) : (
                                <li className='nav-item'>
                                    <Link className='nav-link' data-toggle='modal' data-target='#loginModal' to='/login'>
                                    Login
                                    </Link>
                                </li>
                                )}
                            </ul>
                        </div>
                    </nav>

                    <div>
                        <Login getUser={this.getUser} />
                        <Register />
                        
                        <Switch>
                            <Route exact path='/' component={Posts}/>
                            <Route exact path='/profile/:username' render={(props) => (
                                this.state.user ? (
                                <Profile user={this.state.user} {...props} />
                                ) : (
                                <Redirect to='/'/>
                                )
                            )}/>
                            <Route path='/submitLink' component={SubmitLinkPost} />
                            <Route path='/submitText' component={SubmitTextPost} />
                            <Route exact path={`/:title/:shortId`} render={(props) => (
                                this.state.user ? (
                                <ViewPost user={this.state.user} {...props} />
                                ) : (
                                <ViewPost {...props}/>
                                )
                            )}/>
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Routes;