import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <div id='notfound'>
                <div className='view notfound hm-stylish-light'>
                    <div className='mask flex-center'>
                    <ul>
                        <li>
                            <h1 className='h1-responsive font-bold white-text'>404 Page Not Found</h1>
                        </li>
                        <li>
                            <a href='/' className='btn btn-elegant'>Home page</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;