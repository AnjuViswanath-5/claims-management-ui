import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

import ViewClaimSummary from './component/viewclaimsummary.jsx';
import LoginComponent from './component/login.jsx';
import UpdateClaim from './component/updateclaim.jsx';
import AppRouter from './component/AppRoute.jsx';
import HomeComponent from './component/Home.jsx';
import AboutComponent from './component/about.jsx';
import ContactComponent from './component/contact.jsx';

// Router configuration to map the route 

ReactDOM.render((
     <Router history = {browserHistory}>
     <Route path = "/" component = {AppRouter}>
            <IndexRoute component = {LoginComponent} />
            <Route path = "viewclaimsummary" component = {ViewClaimSummary} />
            <Route path = "login" component = {LoginComponent} />
            <Route path = "updateclaim" component = {UpdateClaim} />
            <Route path = "home" component = {HomeComponent} />
            <Route path = "about" component = {AboutComponent} />
            <Route path = "contact" component = {ContactComponent} />
     </Route>
    </Router>
    ), document.getElementById('router'));


