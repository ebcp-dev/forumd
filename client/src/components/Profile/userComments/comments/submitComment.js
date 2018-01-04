import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios';

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

    componentDidMount() {
        //console.log(this.props)
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
        });

        window.location.reload();
    }

    handleChange(e) {
        const values = this.state;
        values[e.target.name] = e.target.value;
        this.setState(values);
    }

    render () {
        // eslint-disable-next-line
        const { text } = this.state;
        return (
            <div>
                <p>
                    <a className="btn btn-elegant btn-sm" 
                    data-toggle="collapse" href="#collapseExample" 
                    aria-expanded="false" aria-controls="collapseExample">
                    Comment on the post
                    </a>
                </p>
                <form onSubmit={this.submitFormOnClick}>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                            <div className="md-form">
                                <input type="text" id="text-form" 
                                className="form-control" name="text"
                                value={text} onChange={this.handleChange}/>
                                <label htmlFor="text-form">Comment</label>
                            </div>
                            <div className="flex-row">
                                <button type="submit" className="btn btn-elegant">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SubmitComment;