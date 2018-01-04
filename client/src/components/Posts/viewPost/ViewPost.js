import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './ViewPost.css';
import Utility from '../../../Utility';
import SubmitComment from '../comments/submitComment';
import DeleteComment from '../comments/deleteComments';

class ViewPost extends Component {
    constructor() {
        super();
 
        this.state = {
            post: null,
            comments: [],
            sort: 'New'
        };
        this.handleSort = this.handleSort.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentWillMount() {
        this.getPost();
    }

    getPost() {
        let postTitle = this.props.match.params.title;
        let shortId = this.props.match.params.shortId;
        axios.get(`/api/post/${postTitle}/${shortId}`).then(response => {
            console.log(response.data);
            return this.setState({
                post: response.data,
                comments: response.data._comments.reverse()
            });
        }).catch(error => {
            return this.setState({
                post: false
            });
        });
    }

    deletePost(e) {
        e.preventDefault();
        const { shortId } = this.state.post;
        axios.post('/api/deletePost', { shortId }).then(response => {
            return this.setState({
                post: 'deleted'
            });
        }).catch(error => {
            console.log(error);
        });
    }
    // Sort by date
    handleSort(e) {
        e.preventDefault();
        if (this.state.sort === 'New') {
            this.setState({ 
                sort: 'Old',
                comments: this.state.comments.reverse()
            });
        } else if (this.state.sort === 'Old') {
            this.setState({ 
                sort: 'New',
                comments: this.state.comments.reverse()
            });
        }
    }

    render() {
        console.log(this.state);
        if (this.state.post && this.state.post !== 'deleted') {
            const { post, comments, sort } = this.state;
            return (
                <div>
                    <div className='container'>
                        <h2 className='h2-responsive mt-4 font-bold dark-grey-text'>
                            <strong>{post.title}</strong>
                        </h2>
                        {post._author && !post._author.isDeleted
                        ? <a className='text-muted'>by {post._author.username}</a>
                        : <a className='text-muted'>by deleted</a>
                        }
                        <p className='text-muted'>
                        {Utility.parseDate(post.createdAt).month}/
                        {Utility.parseDate(post.createdAt).date}/
                        {Utility.parseDate(post.createdAt).year}
                        </p>
                        <hr />
                        {post.text && (
                        <div dangerouslySetInnerHTML={{__html: post.text}}></div>
                        )}
                        {post.link && (
                        <div>
                            <a href={post.link} target='_blank'>{post.link}</a>
                            <br/>
                        </div>
                        )}
                        {post._author && (
                            <div>
                                {this.props.user && this.props.user.username === post._author.username && (
                                <button onClick={this.deletePost} className='btn btn-danger btn-sm'>
                                    Delete Post
                                </button>
                                )}
                            </div>
                        )}
                        <hr />
                        <button onClick={this.handleSort} type='button' className='btn btn-elegant btn-sm'>
                            <i className='fa fa-sort' aria-hidden='true'></i>
                            &nbsp; {sort}
                        </button>
                        <SubmitComment postId={this.props.match.params.shortId} 
                        title={this.props.match.params.title}
                        url={this.props.match.url} />
                        {comments.map(comment => {
                            if (!comment.isDeleted) {
                                return (
                                    <div key={comment.shortId}>
                                        <blockquote className='blockquote'>
                                            <p className='mb-0'>{comment.text}</p>
                                            {comment._author && !comment._author.isDeleted
                                            ?   <footer className="blockquote-footer">
                                                {comment._author.username}, {Utility.parseDate(comment.createdAt).elapsed}
                                                </footer>
                                            :   <footer className="blockquote-footer">deleted, {Utility.parseDate(comment.createdAt).elapsed}</footer>
                                            }
                                            {comment._author && this.props.user && this.props.user.username === comment._author.username && (
                                            <DeleteComment shortId={comment.shortId} />
                                            )}
                                        </blockquote>
                                    </div>
                                );
                            } else if (comment.isDeleted) {
                                return (
                                    <div key={comment.shortId}>
                                        <p className='mb-0 text-muted'>comment deleted {Utility.parseDate(comment.createdAt).elapsed}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            );
        } else if (!this.state.post && this.state.post === 'deleted') {
            return (
                <Redirect to='/' />
            );
        }
        return <h1>Post Deleted</h1>;
    }
}

export default ViewPost;