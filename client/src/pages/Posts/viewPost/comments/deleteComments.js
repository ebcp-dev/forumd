import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios';

class DeleteComment extends Component {
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
        const commentId = this.props.shortId;
        
        axios.post(`/api/deleteComment`, {shortId: commentId})
        .then(response => {
            console.log(response);
            this.setState({ isDeleted: true });
        }).catch(error => {
            console.log(error.response);
        });
    }

    render () {
        return (
            <a onClick={this.submitFormOnClick} className="card-link">
            Delete
            </a>
        );
    }
}

export default DeleteComment;