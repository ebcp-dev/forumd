import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';

import Utility from '../../Utility';
import UserBookmarks from './bookmarks/UserBookmarks';
import UserComments from './comments/UserComments';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            username: '',
            curPassword: '',
            newPassword: '',
            email: '',
            name: ''
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // Set initial state with user props
    componentWillMount() {
        this.setState({ user: this.props.user });
    }

    componentDidMount() {
        this.isAuthenticated();
    }
    
    isAuthenticated() {
        axios.get('/api/user').then((response) => {
            if (response.data.user) {
                this.setState({
                    isAuthenticated: true,
                    user: response.data.user,
                    username: response.data.user.username,
                    name: response.data.user.name,
                    email: response.data.user.email
                });
            }
        });
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { username, curPassword, email, name } = this.state;
        if (!username || !email || !name) {
            return this.setState({ 
                success: false,
                response: 'Please complete the form.'
            });
        }
        if (!curPassword) {
            return this.setState({ 
                success: false,
                response: 'Password needed to change profile details.'
            });
        }
        
        axios.post('/api/updateUser', { username, curPassword, email, name })
        .then(response => {
            console.log(response.data);
            this.setState({ 
                success: true,
                user: response.data.data,
                username: response.data.data.username,
                name: response.data.data.name,
                email: response.data.data.email
            });
        }).catch(error => {
            console.log(error.response);
            this.setState({ 
                success: false,
                response: error.response.data.message
            });
        });
    }
    // Get value of input fields and assign to state
    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render() {
        console.log(this.state)
        const dbusername = this.state.user.username;
        const dbemail = this.state.user.email;
        const dbname = this.state.user.name;
        const { createdAt, bookmarks } = this.state.user;
        const { username, email, name, curPassword } = this.state;
        return (
            <div className="container profile">
                <div className="jumbotron">
                    <h4 className="card-title">Username: {dbusername}</h4>
                    <p className="card-text">Email: {dbemail}</p>
                    <p className="card-text">Name: {dbname}</p>
                    <p className="card-text">Created: {Utility.parseDate(createdAt).elapsed}</p>
                    <a className="btn btn-elegant" data-toggle="collapse" href="#editForm" aria-expanded="false" aria-controls="editForm">
                        Edit
                    </a>
                </div>
                {this.state.success === false && (
                    <div className="modal-body">
                        <p className="red-text">{this.state.response}</p>
                    </div>
                )}
                <div className="collapse" id="editForm">
                    <div className="card card-body">
                        <form onSubmit={this.submitFormOnClick}>
                            <div className="modal-body">
                                <div className="">
                                    <input type="text" id="username-form" 
                                    className="form-control" name="username" 
                                    value={username} onChange={this.handleChange}/>
                                    <label className="profileFormLabel" htmlFor="username-form">Username</label>
                                </div>
                                <div className="">
                                    <input type="text" id="email-form" 
                                    className="form-control" name="email"
                                    value={email} onChange={this.handleChange}/>
                                    <label className="profileFormLabel" htmlFor="email-form">Email</label>
                                </div>
                                <div className="">
                                    <input type="text" id="name-form" 
                                    className="form-control" name="name"
                                    value={name} onChange={this.handleChange}/>
                                    <label className="profileFormLabel" htmlFor="name-form">Name</label>
                                </div>
                                <div className="">
                                    <input type="text" id="password-form" 
                                    className="form-control" name="curPassword"
                                    value={curPassword} onChange={this.handleChange}/>
                                    <label className="profileFormLabel" htmlFor="curPassword-form">Password</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="flex-row">
                                    <button type="submit" className="btn btn-elegant">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <nav className="nav nav-tabs" id="myTab" role="tablist">
                        <a className="nav-item nav-link active" 
                        id="nav-comments-tab" data-toggle="tab" href="#nav-comments">
                            Comments
                        </a>
                        <a className="nav-item nav-link" 
                        id="nav-bookmarks-tab" data-toggle="tab" href="#nav-bookmarks">
                            Bookmarks
                        </a>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className='tab-pane fade show active' id="nav-comments">
                            <UserComments />
                        </div>
                        <div className='tab-pane fade' id="nav-bookmarks">
                            <UserBookmarks bookmarks={bookmarks} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
