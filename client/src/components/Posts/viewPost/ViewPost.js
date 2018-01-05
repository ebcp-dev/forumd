import React, { Component } from 'react';
import axios from 'axios';

import './ViewPost.css';
import Utility from '../../../Utility';
import SubmitComment from '../comments/submitComment';
import DeleteComment from '../comments/deleteComments';
import EditPost from '../editPost/EditPost';

class ViewPost extends Component {
    constructor() {
        super();
 
        this.state = {
            post: null,
            comments: [],
            sort: 'New'
        };
        this.handleSort = this.handleSort.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentWillMount() {
        this.getPost();
    }

    getPost() {
        let postTitle = this.props.match.params.title;
        let shortId = this.props.match.params.shortId;
        axios.get(`/api/post/${postTitle}/${shortId}`).then(response => {
            //console.log(response.data);
            return this.setState({
                post: response.data,
                comments: response.data._comments.reverse()
            });
        }).catch(error => {
            return this.setState({
                post: {
                    title: 'Post doesn\'t exist anymore.',
                    text: 'The author may have deleted the post.'
                }
            });
        });
    }

    deletePost(e) {
        e.preventDefault();
        const { shortId } = this.state.post;
        axios.post('/api/deletePost', { shortId }).then(response => {
            return this.setState({
                post: {
                    title: 'Post has been deleted.',
                    text: 'You have deleted this post.'
                }
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

    handleChange(value) {
        this.setState({ text: value});
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
                                <div>
                                    <button type='button' data-toggle='collapse' 
                                     data-target='#edit-post-form' aria-expanded='false' 
                                     aria-controls='edit-post-form' className='btn btn-default btn-sm p-2'>
                                       Edit Post
                                    </button>
                                    <button onClick={this.deletePost} className='btn btn-danger btn-sm p-2'>
                                        Delete Post
                                    </button>
                                    {post.text && (
                                    <EditPost text={post.text} shortId={post.shortId} />
                                    )}
                                </div>
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
                                            <div dangerouslySetInnerHTML={{__html: comment.text}}></div>
                                            {comment._author && !comment._author.isDeleted
                                            ?   <footer className='blockquote-footer'>
                                                {comment._author.username}, {Utility.parseDate(comment.createdAt).elapsed}
                                                </footer>
                                            :   <footer className='blockquote-footer'>deleted, {Utility.parseDate(comment.createdAt).elapsed}</footer>
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
        }
        return (
            <div>
                <div className='sk-circle'>
                    <div className='sk-circle1 sk-child'></div>
                    <div className='sk-circle2 sk-child'></div>
                    <div className='sk-circle3 sk-child'></div>
                    <div className='sk-circle4 sk-child'></div>
                    <div className='sk-circle5 sk-child'></div>
                    <div className='sk-circle6 sk-child'></div>
                    <div className='sk-circle7 sk-child'></div>
                    <div className='sk-circle8 sk-child'></div>
                    <div className='sk-circle9 sk-child'></div>
                    <div className='sk-circle10 sk-child'></div>
                    <div className='sk-circle11 sk-child'></div>
                    <div className='sk-circle12 sk-child'></div>
                </div>
            </div>
        );
    }
}

export default ViewPost;