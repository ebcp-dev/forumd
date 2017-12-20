import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';

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
        //this.isAuthenticated();
        this.setState({
            user: this.props.user
        });
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

    parseDate(parseDate) {
        //since we are getting a UTC date
        const msecPerMinute = 1000 * 60;  
        const msecPerHour = msecPerMinute * 60;  
        const msecPerDay = msecPerHour * 24;  

        const date = new Date(parseDate);
        const current = new Date();

        let interval = current.getTime() - date.getTime();
        let days = Math.floor(interval / msecPerDay );
        //interval = interval - (days * msecPerDay );
        let hours = Math.floor(interval / msecPerHour );
        //interval = interval - (hours * msecPerHour );
        let minutes = Math.floor(interval / msecPerMinute );
        //interval = interval - (minutes * msecPerMinute );
        let seconds = Math.floor(interval / 1000 );
        let elapsed;
        if (interval > 1000) {
            elapsed = `${seconds} second(s) ago.`;
        }
        if (seconds > 60) {
            elapsed = `${minutes} minute(s) ago.`;
        }
        if (minutes > 60) {
            elapsed = `${hours} hour(s) ago.`;
        }
        if (hours > 24) {
            elapsed = `${days} day(s) ago.`;
        }
        let parsedDate = {
            month: date.getMonth()+1,
            date: date.getDate(),
            year: date.getFullYear(),
            elapsed
        };
        return parsedDate;
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
            <div className="container">
                <div className="jumbotron">
                    <h4 className="card-title">Username: {dbusername}</h4>
                    <p className="card-text">Email: {dbemail}</p>
                    <p className="card-text">Name: {dbname}</p>
                    <p className="card-text">Created: {this.parseDate(createdAt).elapsed}</p>
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
                        <div className="md-form">
                            <input type="text" id="password-form" 
                            className="form-control" name="curPassword"
                            value={curPassword} onChange={this.handleChange}/>
                            <label htmlFor="curPassword-form">Password</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="flex-row">
                            <button type="submit" className="btn btn-elegant">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;
