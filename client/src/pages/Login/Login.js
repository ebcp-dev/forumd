import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: null,
            response: null
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { username, password } = this.state;
        
        axios.post('/api/login', { username, password })
        .then(response => {
            this.setState({ success: true });
            console.log(response);
            window.location.reload();
        }).catch(error => {
            this.setState({ success: false, response: "Invalid credentials." });
        });
    }

    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render () {
        const { username, password } = this.state;
        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModal">Login</h5>
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

export default Login;