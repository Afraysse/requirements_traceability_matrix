import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';

ReactStormpath.init();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={MasterPage}>
            <IndexRoute component={IndexPage} />
            <LoginRoute path='/login' component={LoginPage} />
            <Route path='/register' component={RegistrationPage} />
        </Route>
    </Router>
    document.getElementById('app-container')
);