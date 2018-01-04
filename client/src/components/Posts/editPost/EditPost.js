import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

import './EditPost.css';
import Utility from '../../../Utility';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.submitFormOnClick = this.submitFormOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            text: this.props.text
        });
    }

    submitFormOnClick(e) {
        e.preventDefault();
        const { text } = this.state;
        const shortId = this.props.shortId;
        
        axios.post('/api/editPost', { shortId, text })
        .then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
    }

    handleChange(value) {
        this.setState({ text: value});
    }

    render() {
        return (
            <div className='collapse submit-text-form' id='edit-post-form'>
                <form onSubmit={this.submitFormOnClick}>
                    <ReactQuill className='text-form' value={this.state.text}
                    theme='snow' modules={Utility.toolbar} onChange={this.handleChange}  />
                    <br />
                    <br />
                    <div className="flex-row">
                        <button type="submit" className="btn btn-elegant btn-sm">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPost;