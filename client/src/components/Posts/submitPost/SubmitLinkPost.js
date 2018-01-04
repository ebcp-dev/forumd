import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './SubmitPost.css';

class SubmitLinkPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            success: null,
            response: null,
            authenticated: null
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { title, link } = this.state;
        if (!link) {
            return this.setState({ 
                success: false
            });
        }
        
        axios.post('/api/submitPost', { title, link })
        .then(response => {
            console.log(response);
            if (response.data.authenticated === false) {
                this.setState({ 
                    success: false,
                    authenticated: false 
                });
            } else {
                this.setState({ 
                    success: true,
                    authenticated: true 
                });
            }
        }).catch(error => {
            console.log(error.response);
            this.setState({ success: true, response: error.response.message });
        });
    }

    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render() {
        const { title, link } = this.state;
        return (
            <div className='container'>
                <div className='submitPostForm'>
                    <div className="card card-body">
                        <h4 className="card-title">Submit Link</h4>
                        {this.state.authenticated === false && (
                        <p className="red-text">You must be logged in to make a post.</p>
                        )}
                        {!this.state.title && (
                        <p className="red-text">Title required.</p>
                        )}
                        {!this.state.link && (
                        <p className="red-text">Link required.</p>
                        )}
                        <form onSubmit={this.submitFormOnClick}>
                            <div className="md-form">
                                <input type="text" id="title-form" 
                                className="form-control" name="title" 
                                value={title} onChange={this.handleChange}/>
                                <label htmlFor="title-form">Title</label>
                            </div>
                            <div className="md-form">
                                <input type="text" id="link-form" 
                                className="form-control" name="link"
                                value={link} onChange={this.handleChange}/>
                                <label htmlFor="link-form">Link</label>
                            </div>
                            <div className="flex-row">
                                <button type="submit" className="btn btn-elegant">Submit</button>
                            </div>
                        </form>
                        {this.state.success && (
                            <Redirect to={{
                                pathname: '/'
                            }} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitLinkPost;