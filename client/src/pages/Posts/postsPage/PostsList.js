import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../Pagination';
import './Posts.css';

import Utility from '../../../Utility';

class PostsList extends Component {
    constructor() {
        super();
 
        this.state = {
            pageOfItems: [],
            sort: 'New'
        };
 
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    
    onChangePage(pageOfItems) {
        // Update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    // Sort by date
    handleSort(e) {
        e.preventDefault();
        if (this.state.sort === 'New') {
            this.setState({ 
                sort: 'Old',
                posts: this.state.pageOfItems.reverse()
            });
        } else if (this.state.sort === 'Old') {
            this.setState({ 
                sort: 'New',
                posts: this.state.pageOfItems.reverse()
            });
        }
    }

    render() {
        console.log(this.props.posts)
        return (
            <div className="postsList">
                <button onClick={this.handleSort} type="button" className="btn btn-elegant btn-sm">
                    <i className="fa fa-sort" aria-hidden="true"></i>
                    &nbsp; {this.state.sort}
                </button>
                <div className="row">
                    {this.state.pageOfItems.map(post => (
                    <div key={post._id} className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                {post.link
                                    ?
                                    <div className='flex-row'>
                                        <Link className='d-inline-flex p-2' to={`${this.props.match.url}/${post.title}/${post.shortId}`}>
                                            <h4 className="card-title h4-responsive">{post.title}</h4>
                                        </Link>
                                        <a className='d-inline-flex p-2' href={post.link}>
                                            <i className="fa fa-external-link" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    :
                                    <Link to={`${this.props.match.url}/${post.title}/${post.shortId}`}>
                                        <h4 className="card-title h4-responsive">{post.title}</h4>
                                    </Link>
                                }
                                {post._author 
                                ? <p className="card-text">by {post._author.username}</p>
                                : <p className="card-text">by deleted</p>
                                }
                                <p className="card-text">
                                    {Utility.parseDate(post.createdAt).month}
                                    /{Utility.parseDate(post.createdAt).date}
                                    /{Utility.parseDate(post.createdAt).year}
                                </p>
                                <p className="card-text">
                                    {Utility.parseDate(post.createdAt).elapsed}
                                </p>
                                <Link to={`${this.props.match.url}/${post.title}/${post.shortId}`}>
                                    <i className="fa fa-comments-o" aria-hidden="true"></i>
                                    &nbsp;{post._comments.length}
                                </Link>
                            </div>
                        </div>
                        <br/>
                    </div>
                    ))}
                </div>
                <Pagination items={this.props.posts} onChangePage={this.onChangePage} />
            </div>
        );
    }
}

export default PostsList;