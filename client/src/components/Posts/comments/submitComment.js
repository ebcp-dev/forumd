import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

import './Comments.css';
import Utility from '../../../Utility';

class SubmitComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            success: false
        }

        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { text } = this.state;
        let postTitle = this.props.title.split(' ').join('%20');
        let postId = this.props.postId;
        let postLink = this.props.url.split(' ').join('%20');
        
        axios.post(`/api/post/${postTitle}/${postId}/submitComment`,
        { text, postId, postLink })
        .then(response => {
            this.setState({ success: true });
            console.log(response);
            window.location.reload();
        });
    }

    handleChange(value) {
        this.setState({ text: value });
    }

    render () {
        const { text } = this.state;
        return (
            <div>
                <p>
                    <a className='btn btn-elegant btn-sm' 
                    data-toggle='collapse' href='#submitCommentForm' 
                    aria-expanded='false' aria-controls='submitCommentForm'>
                    Comment on the post
                    </a>
                </p>
                <form onSubmit={this.submitFormOnClick}>
                    <div className='collapse' id='submitCommentForm'>
                        <div className='submit-text-form'>
                            <div className='md-form'>
                                <ReactQuill className='text-form' 
                                value={text} modules={Utility.toolbar} 
                                onChange={this.handleChange}/>
                            </div>
                            <br />
                            <div className='flex-row'>
                                <button type='submit' className='btn btn-elegant btn-sm'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </form>
            </div>
        );
    }
}

export default SubmitComment;