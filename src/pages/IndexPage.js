import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="container">
                <h2 className="text-center">Welcome!</h2>
                <hr />
                <div className="jumbotron">
                    <p>
                        <strong>to my React application!</strong>
                    </p>
                    <p>Ready to begin?</p>
                    <ol className="lead">
                        <li><Link to="/register">Register!</Link></li>
                        <li><LoginLink /></li>
                        <li><Link to="/profile">Custom profile</Link></li>
                    </ol>
                </div>
            </div>
        );
    }
}