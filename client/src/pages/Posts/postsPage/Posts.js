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
            user: null
        }
    }

    componentWillMount() {
        this.getPosts();
    }

    componentDidMount () {
        this.isAuthenticated();
    }

    isAuthenticated() {
        axios.get('/api/user').then((response) => {
            //console.log(response)
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
            // Reverse array to sort by latest
            this.setState({ 
                posts: results.data.reverse()
            });
        });
    }

    render () {
        // Reverse posts to render latest first
        return (
            <div className="container posts">
                <br />
                <div className="animated row fadeIn">
                    <div className="col-md-8">
                        <a href="/posts">
                            <h1 className="h1-responsive display-4">Trending</h1>
                        </a>
                        <Link to="/posts/submitTextPost">
                            <button type="button" className="btn btn-elegant btn-sm">Submit a text post</button>
                        </Link>
                        <Link to="/posts/submitLinkPost">
                            <button type="button" className="btn btn-elegant btn-sm">Submit a link post</button>
                        </Link>
                    </div>
                </div>

                <hr/>
                <Switch>
                    <Route path="/posts/submitTextPost" component={SubmitTextPost}/>
                    <Route path="/posts/submitLinkPost" component={SubmitLinkPost}/>
                    <Route exact path="/posts" render={(props) => (
                        <PostsList posts={this.state.posts} {...props} />
                    )}/>
                    <Route exact path={`${this.props.match.url}/:title/:shortId`} component={ViewPost}/>
                </Switch>
            </div>
        );
    }
}

export default Posts;
