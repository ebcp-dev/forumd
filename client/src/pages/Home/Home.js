import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="container">
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
        <div className="row">

          <div className="col-lg-4">
            <div className="animated card fadeIn">
              <div className="card-body">
                <h4 className="card-title">Top posts</h4>
                <p className="card-text">Top trending posts of the day.</p>
                <Link to='/posts'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
            <br/>
          </div>
          <div className="col-lg-4">
            <div className="animated card fadeIn">
              <div className="card-body">
                <h4 className="card-title">Profile</h4>
                <p className="card-text">See and edit profile settings.</p>
                <Link to='/posts'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
            <br/>
          </div>
          <div className="col-lg-4">
            <div className="animated card fadeIn">
              <div className="card-body">
                <h4 className="card-title">Favorites</h4>
                <p className="card-text">See your favorited content.</p>
                <Link to='/posts'>
                    <button type="button" className="btn btn-elegant">Open</button>
                </Link>
              </div>
            </div>
          </div>

        </div>
        <hr className="extra-margins"/>
      </div>
    );
  }
}

export default Home;
