import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserBookmarks.css';

import Pagination from '../../../Pagination';

class UserBookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: [],
            pageOfItems: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.setState({ bookmarks: this.props.bookmarks });
    }

    onChangePage(pageOfItems) {
        // Update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className='card card-body' id="nav-bookmarks">
                <h4 className="card-title">Bookmarks</h4>
                <p className="card-text">Your bookmarked content.</p>
                <div className='userBookmarks'>
                    {this.state.pageOfItems.map(bookmark => {
                    let title = bookmark.split('/')[2]
                    return (
                    <div key={bookmark} >
                        <div className='card card-body'>
                            <div className='flex-row'>
                                <Link className='card-link' to={`${bookmark}`}>
                                    {title}
                                </Link>
                            </div>
                        </div>
                    </div>
                    );
                    })}
                </div>
                <hr />
                <div className="flex-row">
                    <Pagination items={this.state.bookmarks} onChangePage={this.onChangePage} />
                </div>
            </div>
        );
    }
}

export default UserBookmarks;