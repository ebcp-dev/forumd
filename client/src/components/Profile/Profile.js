import React, { Component } from 'react';
import axios from 'axios';

import './Profile.css';
import Utility from '../../Utility';
import UserComments from './userComments/UserComments';
import UserPosts from './userPosts/UserPosts';

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

    componentWillMount() {
        this.setState({ 
            user: this.props.user,
            username: this.props.user.username,
            curPassword: '',
            newPassword: '',
            email: this.props.user.email,
            name: this.props.user.name
        });
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { username, curPassword, email, name } = this.state;
        // Handle incomplete form
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
        const dbusername = this.state.user.username;
        const dbemail = this.state.user.email;
        const dbname = this.state.user.name;
        const { createdAt } = this.state.user;
        const { username, email, name, curPassword } = this.state;
        return (
            <div className='container profile'>
                <div className='jumbotron'>
                    <h4 className='card-title'>Username: {dbusername}</h4>
                    <p className='card-text'>Email: {dbemail}</p>
                    <p className='card-text'>Name: {dbname}</p>
                    <p className='card-text'>Created: {Utility.parseDate(createdAt).elapsed}</p>
                    <a className='btn btn-elegant' data-toggle='collapse' href='#editForm' aria-expanded='false' aria-controls='editForm'>
                        Edit
                    </a>
                </div>
                {this.state.success === false && (
                    <div className='modal-body'>
                        <p className='red-text'>{this.state.response}</p>
                    </div>
                )}
                <div className='collapse' id='editForm'>
                    <div className='card card-body'>
                        <form onSubmit={this.submitFormOnClick}>
                            <div className='modal-body'>
                                <div className=''>
                                    <input type='text' id='username' 
                                    className='form-control' name='username' 
                                    value={username} onChange={this.handleChange}/>
                                    <label className='profileFormLabel' htmlFor='username'>Username</label>
                                </div>
                                <div className=''>
                                    <input type='text' id='email' 
                                    className='form-control' name='email'
                                    value={email} onChange={this.handleChange}/>
                                    <label className='profileFormLabel' htmlFor='email'>Email</label>
                                </div>
                                <div className=''>
                                    <input type='text' id='name' 
                                    className='form-control' name='name'
                                    value={name} onChange={this.handleChange}/>
                                    <label className='profileFormLabel' htmlFor='name'>Name</label>
                                </div>
                                <div className=''>
                                    <input type='password' id='curPassword' 
                                    className='form-control' name='curPassword'
                                    value={curPassword} onChange={this.handleChange}/>
                                    <label className='profileFormLabel' htmlFor='curPassword'>Password</label>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <div className='flex-row'>
                                    <button type='submit' className='btn btn-elegant'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
                        <li className='nav-item'>
                            <a className='nav-link active' id='pills-comments-tab' data-toggle='pill' 
                            href='#pills-comments' role='tab' aria-controls='pills-comments' 
                            aria-selected='true'>Comments</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' id='pills-posts-tab' data-toggle='pill' 
                            href='#pills-posts' role='tab' aria-controls='pills-posts' 
                            aria-selected='false'>Posts</a>
                        </li>
                        {/* <li className='nav-item'>
                            <a className='nav-link' id='pills-bookmarks-tab' data-toggle='pill' 
                            href='#pills-bookmarks' role='tab' aria-controls='pills-bookmarks' 
                            aria-selected='false'>Bookmarks</a>
                        </li> */}
                    </ul>
                    <div className='container'>
                        <div className='tab-content' id='v-pills-tabContent'>
                            <div className='tab-pane fade show active' id='pills-comments' role='tabpanel' 
                            aria-labelledby='pills-comments-tab'><UserComments /></div>
                            <div className='tab-pane fade' id='pills-posts' role='tabpanel' 
                            aria-labelledby='pills-posts-tab'><UserPosts /></div>
                            {/* <div className='tab-pane fade' id='pills-bookmarks' role='tabpanel' 
                            aria-labelledby='pills-bookmarks-tab'>bookmarks</div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
