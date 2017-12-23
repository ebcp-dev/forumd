import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserComments.css';

import Utility from '../../../Utility';
import Pagination from '../../../Pagination';
import DeleteComment from '../../Posts/viewPost/comments/deleteComments';

class UserComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            pageOfItems: []
        }
        this.commentDeleted = this.commentDeleted.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.getUserComments();
    }

    getUserComments() {
        axios.get('/api/AllUserComments')
        .then(results => {
            this.setState({ 
                comments: results.data.data.reverse()
            });
            console.log(this.state.comments);
        });
    }
    // Handle deleting comment
    commentDeleted() {
        // Because database updated
        this.getUserComments();
        //console.log(this.state.comments);
    }
    
    onChangePage(pageOfItems) {
        // Update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className='card card-body commentCard'>
                <h4 className="card-title">Comments</h4>
                <p className="card-text">Your submitted comments.</p>
                <div className='userComments'>
                    {this.state.pageOfItems.map(comment => {
                    return (
                    <div key={comment.shortId} >
                        {comment.isDeleted === false && (
                        <div className='card card-body'>
                            <p className='card-text'>{comment.text}</p>
                            <p className="card-text">Submitted: {Utility.parseDate(comment.createdAt).elapsed}</p>
                            <div className='flex-row'>
                                <Link className='card-link' to={`${comment.postLink}`}>
                                    Visit
                                </Link>
                                <DeleteComment deleted={this.commentDeleted} shortId={comment.shortId} />
                            </div>
                        </div>
                        )}
                    </div>
                    );
                    })}
                </div>
                <hr />
                <div className="flex-row">
                    <Pagination items={this.state.comments} onChangePage={this.onChangePage} />
                </div>
            </div>
        );
    }
}

export default UserComments;