import React, { Component } from 'react';
import axios from 'axios';
import './ViewPost.css';

import SubmitComment from './comments/submitComment';
import DeleteComment from './comments/deleteComments';

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

  parseDate(parseDate) {
    //since we are getting a UTC date
    const msecPerMinute = 1000 * 60;  
    const msecPerHour = msecPerMinute * 60;  
    const msecPerDay = msecPerHour * 24;  

    const date = new Date(parseDate);
    const current = new Date();

    let interval = current.getTime() - date.getTime();
    let days = Math.floor(interval / msecPerDay );
    //interval = interval - (days * msecPerDay );
    let hours = Math.floor(interval / msecPerHour );
    //interval = interval - (hours * msecPerHour );
    let minutes = Math.floor(interval / msecPerMinute );
    //interval = interval - (minutes * msecPerMinute );
    let seconds = Math.floor(interval / 1000 );
    let elapsed;
    if (interval > 1000) {
        elapsed = `${seconds} second(s) ago.`;
    }
    if (seconds > 60) {
        elapsed = `${minutes} minute(s) ago.`;
    }
    if (minutes > 60) {
        elapsed = `${hours} hour(s) ago.`;
    }
    if (hours > 24) {
        elapsed = `${days} day(s) ago.`;
    }
    let parsedDate = {
        month: date.getMonth()+1,
        date: date.getDate(),
        year: date.getFullYear(),
        elapsed
    };
    return parsedDate;
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
            <div className="card-body">
                <h4 className="card-title">{this.state.post.title}</h4>
                <p className="card-text">{this.state.post._author.username}</p>
                <p className="card-text">{this.parseDate(this.state.post.createdAt).elapsed}</p>
                {this.state.post.link
                ? <a href={this.state.post.link}>{this.state.post.link}</a>
                : <p className="card-text">{this.state.post.text}</p>
                }
            </div>
          </div>
          <hr />
          <SubmitComment title={this.props.match.params.title}
              isAuthenticated={this.state.isAuthenticated}
              url={this.props.location.pathname} 
              postId={this.props.match.params.shortId} />
          {this.state.post._comments && this.state.post._comments.reverse().map(comment => (
          <div key={comment.shortId} className="card card-body">
              <p className="card-text">{comment.text}</p>
              <p className="card-text">{comment._author.username}</p>
              <p className="card-text">
                  {this.parseDate(comment.createdAt).elapsed}
              </p>
              <p className="card-text">
                  {comment.shortId}
              </p>
              {this.state.isAuthenticated && this.state.user.username === comment._author.username && (
              <DeleteComment shortId={comment.shortId} />
              )}
          </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

export default ViewPost;
