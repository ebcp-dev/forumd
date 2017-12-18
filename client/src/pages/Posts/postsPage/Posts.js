import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import './Posts.css';

import ViewPost from '../viewPost/ViewPost';
import PostsList from './PostsList';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        this.getPosts();
    }

    getPosts () {
        axios.get('/api/allPosts')
        .then(results => {
            //console.log(results.data);
            this.setState({ posts: results.data });
        })
    }

    render () {
        return (
            <div className="container">
                <br />
                <div className="animated row fadeIn">
                    <div className="col-md-12">
                        <Link to="/posts">
                            <h1 className="display-4">Posts</h1>
                        </Link>
                        <Link to={"/submitTextPost"}>
                            <button type="button" className="btn btn-elegant">Submit a text post</button>
                        </Link>
                        <Link to={"/submitLinkPost"}>
                            <button type="button" className="btn btn-elegant">Submit a link post</button>
                        </Link>
                    </div>
                </div>

                <hr/>

                <Switch>
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
