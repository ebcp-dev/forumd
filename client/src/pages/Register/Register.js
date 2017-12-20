import React, { Component } from 'react';
import './Register.css';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            success: null,
            response: null
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { username, password, email, name } = this.state;
        if (!username || !password || !email || !name) {
            return this.setState({ 
                success: false,
                response: 'Please complete the form.'
            });
        }
        
        axios.post('/api/register', { username, password, email, name })
        .then(response => {
            this.setState({ success: true });
            console.log(response);
            window.location.reload();
        }).catch(error => {
            this.setState({ success: false, response: error.response.data.message });
        });
    }

    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render () {
        const { username, password, email, name } = this.state;
        return (
            <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registerModal">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {this.state.success === false && (
                            <div className="modal-body">
                                <p className="red-text">{this.state.response}</p>
                            </div>
                        )}
                        <form onSubmit={this.submitFormOnClick}>
                            <div className="modal-body">
                                <div className="md-form">
                                    <input type="text" id="username-form" 
                                    className="form-control" name="username" 
                                    value={username} onChange={this.handleChange}/>
                                    <label htmlFor="username-form">Username</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="password-form" 
                                    className="form-control" name="password"
                                    value={password} onChange={this.handleChange}/>
                                    <label htmlFor="password-form">Password</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="email-form" 
                                    className="form-control" name="email"
                                    value={email} onChange={this.handleChange}/>
                                    <label htmlFor="email-form">Email</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="name-form" 
                                    className="form-control" name="name"
                                    value={name} onChange={this.handleChange}/>
                                    <label htmlFor="name-form">Name</label>
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
            </div>
        );
    }
}

export default Register;