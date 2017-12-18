import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

class PostsList extends Component {

    render() {
        return (
            <div>
                {/* Render posts by newest by reversing array. */}
                {console.log(this.props)}
                {this.props.posts.reverse().map(post => (
                    <div key={post._id} className="row mt-5">
                        <div className="col-lg-7">
                            <div className="view overlay hm-white-light z-depth-1-half">
                                <img src="/img/darkstockphoto.jpg" className="img-fluid" alt=""/>
                            </div>
                        </div>
                
                        <div className="col-lg-5">
                            <br />
                            <a><h2 className="post-title font-bold">{post.title}</h2></a>
                            <p className="my-4">by {post._author.username}</p>
                            <p className="my-4">{post.createdAt}</p>
                            <Link to={`${this.props.match.url}/${post.title}/${post.shortId}`}>
                                <button type="button" className="btn btn-elegant">Open</button>
                            </Link>
                            <hr />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default PostsList;