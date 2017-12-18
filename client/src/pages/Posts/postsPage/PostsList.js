import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

class PostsList extends Component {

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

    render() {
        return (
            <div className="row">
                {this.props.posts.map(post => (
                <div key={post._id} className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{post.title}</h4>
                            <p className="card-text">by {post._author.username}</p>
                            <p className="card-text">
                                {this.parseDate(post.createdAt).month}
                                /{this.parseDate(post.createdAt).date}
                                /{this.parseDate(post.createdAt).year}
                            </p>
                            <p className="card-text">
                                {this.parseDate(post.createdAt).elapsed}
                            </p>
                            <Link to={`${this.props.match.url}/${post.title}/${post.shortId}`}>
                                <button type="button" className="btn btn-elegant">Open</button>
                            </Link>
                        </div>
                    </div>
                    <br/>
                </div>
                ))}
            </div>
        );
    }
}

export default PostsList;