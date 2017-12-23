import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="container home">
        <div className="animated row fadeIn">
          <div className="col-md-12">
            <div className="jumbotron">
              <h2 className="h2-responsive">FORUM'd</h2>
              <br/>
              <p>An online forum created with the MERN stack.</p>
            </div>
          </div>
        </div>
        <hr className="extra-margins"/>
        <div className='row'>
          <div className="col col-lg-12">
            <div className="animated card text-center fadeIn">
              <div className="card-body">
                <h4 className="card-title">Trending</h4>
                <p className="card-text">Top trending posts of the day.</p>
                <Link to='/posts'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
            <br/>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6">
            <div className="animated card text-center fadeIn">
              <div className="card-body">
                <h4 className="card-title">Profile</h4>
                <p className="card-text">See and edit profile settings.</p>
                <Link to='/profile'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
            <br/>
          </div>
          <div className="col col-lg-6">
            <div className="animated card text-center fadeIn">
              <div className="card-body">
                <h4 className="card-title">Bookmarks</h4>
                <p className="card-text">See your bookmarked content.</p>
                <Link to='/'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
