import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './DeletePost.css';

class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        if(this.props.deleted) this.props.deleted();
        const postId = this.props.shortId;
        
        axios.post(`/api/deletePost`, {shortId: postId})
        .then(response => {
            console.log(response);
            this.setState({ isDeleted: true });
        }).catch(error => {
            console.log(error.response);
        });
    }

    render () {
        if (!this.state.isDeleted) {
            return (
                <a onClick={this.submitFormOnClick} className="card-link">
                Delete
                </a>
            );
        }
        return (
            <Redirect to='/posts' />
        );
    }
}

export default DeletePost;