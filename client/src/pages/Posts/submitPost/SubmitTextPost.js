import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SubmitPost.css';
import axios from 'axios';

class SubmitTextPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            success: null,
            response: null,
            authenticated: null
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { title, text } = this.state;
        if (!text) {
            return this.setState({ 
                success: false
            });
        }
        
        axios.post('/api/submitPost', { title, text })
        .then(response => {
            console.log(response);
            if (response.data.authenticated === false) {
                this.setState({ 
                    success: false,
                    authenticated: false });
            } else {
                this.setState({ 
                    success: true,
                    authenticated: true });
                    window.location.reload();
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

    render () {
        // eslint-disable-next-line
        const { title, link, text } = this.state;
        return (
            <div className='submitPostForm'>
                <div className="card card-body">
                    <h4 className="card-title">Submit Text</h4>
                    {this.state.authenticated === false && (
                    <p className="red-text">You must be logged in to make a post.</p>
                    )}
                    {!this.state.title && (
                    <p className="red-text">Title required.</p>
                    )}
                    {!this.state.text && (
                    <p className="red-text">Text required.</p>
                    )}
                    <form onSubmit={this.submitFormOnClick}>
                        <div className="md-form">
                            <input type="text" id="title-form" 
                            className="form-control" name="title" 
                            value={title} onChange={this.handleChange}/>
                            <label htmlFor="title-form">Title</label>
                        </div>
                        <div className="md-form">
                            <input type="text" id="text-form" 
                            className="form-control" name="text"
                            value={text} onChange={this.handleChange}/>
                            <label htmlFor="text-form">Text</label>
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
            </div>
        );
    }
}

export default SubmitTextPost;