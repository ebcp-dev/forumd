import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: false
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
            <div className="card card-body">
                <h4 className="card-title">Submit Post Form</h4>
                <form onSubmit={this.submitFormOnClick}>
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
                    <div className="flex-row">
                        <button type="submit" className="btn btn-elegant">Submit</button>
                    </div>
                </form>
                {this.state.success && (
                    <Redirect to={{
                        pathname: '/posts'
                    }} />
                )}
            </div>
        );
    }
}

export default Login;