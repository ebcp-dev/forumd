import React, { Component } from 'react';
import axios from 'axios';

import './UserComments.css';
import Utility from '../../../Utility';
import Pagination from '../../../Pagination';

class UserComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            pageOfItems: [],
            sort: 'Old'
        }
        this.handleSort = this.handleSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.getComments();
    }

    getComments() {
        axios.get('/api/allUserComments').then(response => {
            //console.log(response.data);
            this.setState({
                comments: response.data.data.reverse(),
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
                pageOfItems: this.state.comments.reverse()
            });
        } else if (this.state.sort === 'Old') {
            this.setState({ 
                sort: 'New',
                pageOfItems: this.state.comments.reverse()
            });
        }
    }

    render() {
        //console.log(this.state);
        const { comments, sort, pageOfItems } = this.state;
        return (
            <div>
                <button onClick={this.handleSort} type='button' className='btn btn-elegant btn-sm'>
                    <i className='fa fa-sort' aria-hidden='true'></i>
                    &nbsp; {sort}
                </button>
                <hr />
                <ul className='list-group'>
                {pageOfItems.map(comment => {
                    if (!comment.isDeleted) {
                        return (
                            <li key={comment.shortId} className='list-group-item' >
                                <a href={comment.postLink}>
                                <strong dangerouslySetInnerHTML={{__html: comment.text}}></strong>
                                 - {Utility.parseDate(comment.createdAt).elapsed}
                                </a>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
                </ul>
                <Pagination items={comments} onChangePage={this.onChangePage} />
            </div>
        );
    }
}

export default UserComments;