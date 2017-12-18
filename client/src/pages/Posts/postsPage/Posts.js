import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import './Posts.css';

import ViewPost from '../viewPost/ViewPost';
import PostsList from './PostsList';
import SubmitTextPost from '../submitPost/SubmitTextPost';
import SubmitLinkPost from '../submitPost/SubmitLinkPost';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            isAuthenticated: null,
            user: null,
            sort: 'New'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        this.getPosts();
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
            }
        });
    }

    getPosts () {
        axios.get('/api/allPosts')
        .then(results => {
            //console.log(results.data);
            this.setState({ posts: results.data });
        })
    }

    handleClick(e) {
        e.preventDefault();
        if (this.state.sort === 'New') {
            this.setState({ sort: 'Old' });
        } else if (this.state.sort === 'Old') {
            this.setState({ sort: 'New' });
        }
    }

    render () {
        // Reverse posts to render latest first
        return (
            <div className="container">
                <br />
                <div className="animated row fadeIn">
                    <div className="col-md-8">
                        <a href="/posts">
                            <h1 className="display-4">Posts</h1>
                        </a>
                        <Link to="/posts/submitTextPost">
                            <button type="button" className="btn btn-elegant">Submit a text post</button>
                        </Link>
                        <Link to="/posts/submitLinkPost">
                            <button type="button" className="btn btn-elegant">Submit a link post</button>
                        </Link>
                    </div>
                </div>

                <hr/>
                
                <button onClick={this.handleClick} type="button" className="btn btn-elegant">
                    <i className="fa fa-sort" aria-hidden="true"></i>
                    &nbsp; {this.state.sort}
                </button>
                <Switch>
                    <Route path="/posts/submitTextPost" component={SubmitTextPost}/>
                    <Route path="/posts/submitLinkPost" component={SubmitLinkPost}/>
                    <Route exact path="/posts" render={(props) => (
                        <PostsList posts={this.state.posts.reverse()} {...props} />
                    )}/>
                    <Route exact path={`${this.props.match.url}/:title/:shortId`} component={ViewPost}/>
                </Switch>
            </div>
        );
    }
}

export default Posts;
