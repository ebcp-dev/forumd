import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios';

class DeleteComment extends Component {
    constructor(props) {
        super(props);

        this.submitFormOnClick = this.submitFormOnClick.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const commentId = this.props.shortId;
        
        axios.post(`/api/deleteComment`, commentId)
        .then(response => {
            console.log(response);
        });

        window.location.reload();
    }

    render () {
        //console.log(`authenticated: ${this.props.isAuthenticated}`)
        return (
            <div>
                <form onSubmit={this.submitFormOnClick}>
                    <div className="flex-row">
                        <button type="submit" className="btn btn-elegant">Delete</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DeleteComment;