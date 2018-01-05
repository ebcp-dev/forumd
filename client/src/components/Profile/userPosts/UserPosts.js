import React, { Component } from 'react';
import axios from 'axios';

import './UserPosts.css';
import Utility from '../../../Utility';
import Pagination from '../../../Pagination';

class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            pageOfItems: [],
            sort: 'Old'
        }
        this.handleSort = this.handleSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get('/api/allUserPosts').then(response => {
            //console.log(response.data);
            this.setState({
                posts: response.data.data.reverse(),
                sort: 'New'
            })
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
                pageOfItems: this.state.posts.reverse()
            });
        } else if (this.state.sort === 'Old') {
            this.setState({ 
                sort: 'New',
                pageOfItems: this.state.posts.reverse()
            });
        }
    }

    render() {
        //console.log(this.state);
        const { posts, sort, pageOfItems } = this.state;
        return (
            <div>
                <button onClick={this.handleSort} type='button' className='btn btn-elegant btn-sm'>
                    <i className='fa fa-sort' aria-hidden='true'></i>
                    &nbsp; {sort}
                </button>
                <hr />
                {pageOfItems.map(post => {
                    return (
                        <div key={post.shortId}>
                            <p><a href={`/${post.title}/${post.shortId}`}>
                                <strong>{post.title}</strong> - {Utility.parseDate(post.createdAt).elapsed}
                            </a></p>
                        </div>
                    );
                })}
                <Pagination items={posts} onChangePage={this.onChangePage} />
            </div>
        );
    }
}

export default UserPosts;