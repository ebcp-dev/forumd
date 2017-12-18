import React, { Component } from 'react';
import axios from 'axios';
import './ViewPost.css';

import SubmitComment from './../comments/submitComment';
import DeleteComment from './../comments/deleteComments';

class ViewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      meta: {
        upvotes: 0,
        favorites: 0
      },
      isAuthenticated: null,
      user: null
    }
    this.getPost = this.getPost.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentWillMount() {
    this.getPost();
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    axios.get('/api/user').then((response) => {
      console.log(response)
      if (response.data.user) {
        this.setState({
          isAuthenticated: true,
          user: response.data.user
        });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  getPost() {
    let postTitle = this.props.match.params.title;
    let shortId = this.props.match.params.shortId;
    axios.get(`/api/post/${postTitle}/${shortId}`)
    .then(response => {
      return this.setState({ 
        post: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  parseDate(date) {
    //since we are getting a UTC date
    return new Date(date).toString();
  }

  handleUpvote(e) {
    e.preventDefault();
    let upvoted = this.state.meta.upvotes + 1;
    
    this.setState({ meta: { upvotes: upvoted, favorites: this.state.favorites } });
    console.log(this.state.meta.favorites);
  }

  handleFavorite(e) {
    e.preventDefault();
    let favorited = this.state.meta.favorites + 1;
    
    this.setState({ meta: { favorites: favorited, upvotes: this.state.upvotes } });
    console.log(this.state.meta.upvotes);
  }

  render() {
    console.log(this.state);
    if(this.state.post) {
      return (
        <div className="Post">
          <div className="card">
            <img className="img-fluid" src="/img/darkstockphoto.jpg" alt="Post"/>
            <div className="card-body">
                <h4 className="card-title">{this.state.post.title}</h4>
                <p className="card-text">{this.state.post._author.username}</p>
                <p className="card-text">{this.parseDate(this.state.post.createdAt)}</p>
                <p className="card-text">{this.state.post.link}</p>
            </div>
          </div>
          <hr />
          <SubmitComment title={this.props.match.params.title}
              isAuthenticated={this.state.isAuthenticated}
              url={this.props.location.pathname} 
              postId={this.props.match.params.shortId} />
          {this.state.post._comments && this.state.post._comments.reverse().map(comment => ([
            <div key={comment.shortId} className="card card-body">
                <p className="card-text">{comment.text}</p>
                <p className="card-text">{comment._author.username}</p>
                <p className="card-text">{this.parseDate(comment.createdAt)}</p>
                {this.state.isAuthenticated && this.state.user.username === comment._author.username && (
                  <DeleteComment shortId={comment.shortId} />
                )}
            </div>
          ]))}
        </div>
      );
    }
    return null;
  }
}

export default ViewPost;
