import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Posts.css';
import Utility from '../../Utility';
import Pagination from '../../Pagination';

class Posts extends Component {
    constructor() {
        super();
 
        this.state = {
            posts: [],
            pageOfItems: [],
            sort: 'New'
        };
 
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get('/api/allPosts').then(response => {
            //console.log(response);
            return this.setState({
                posts: response.data.reverse()
            });
        })
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
        if (this.state.posts) {
            return (
                <div className='container Posts'>
                    <div className='jumbotron header'>
                        <h1 className="h1-responsive">FORUM'd</h1>
                        <p className='lead'>Explore posts by other users.</p>
                        <hr className='my-2' />
                        <div className="flex-row">
                            <Link to='/submitLink' className="card-link">Submit Link</Link>
                            <Link to='/submitText' className="card-link">Submit Text</Link>
                        </div>
                    </div>
                    <hr/>
                    <button onClick={this.handleSort} type='button' className='btn btn-elegant btn-sm'>
                        <i className='fa fa-sort' aria-hidden='true'></i>
                        &nbsp; {this.state.sort}
                    </button>
                    <div className='row'>
                        {this.state.pageOfItems.map(post => (
                        <div key={post._id} className='col-sm-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    {post.link
                                        ?
                                        <div className='flex-row'>
                                            <a className='d-inline-flex p-2' href={post.link}>
                                                <h4 className='card-title h4-responsive'>{post.title}</h4>&nbsp;
                                                <i className='fa fa-external-link' aria-hidden='true'></i>
                                            </a>
                                        </div>
                                        :
                                        <Link to={`/${post.title}/${post.shortId}`}>
                                            <h4 className='card-title h4-responsive'>{post.title}</h4>
                                        </Link>
                                    }
                                    {post._author 
                                    ? <p className='card-text'>by {post._author.username}</p>
                                    : <p className='card-text'>by deleted</p>
                                    }
                                    {/* <p className='card-text'>
                                        {Utility.parseDate(post.createdAt).month}
                                        /{Utility.parseDate(post.createdAt).date}
                                        /{Utility.parseDate(post.createdAt).year}
                                    </p> */}
                                    <p className='card-text'>
                                        {Utility.parseDate(post.createdAt).elapsed}
                                    </p>
                                    <Link to={`/${post.title}/${post.shortId}`}>
                                        <i className='fa fa-comments-o' aria-hidden='true'></i>
                                        &nbsp;{post._comments.filter(comment => !comment.isDeleted).length}
                                    </Link>
                                </div>
                            </div>
                            <br/>
                        </div>
                        ))}
                    </div>
                    <Pagination items={this.state.posts} onChangePage={this.onChangePage} />
                </div>
            );
        }
        return (
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
        );
    }
}

export default Posts;