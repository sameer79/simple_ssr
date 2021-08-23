import React from 'react'
import { Switch, Route } from "react-router-dom";

import history from './history';

import Dashboard from '../components/dashboard';
import DiscoveryDashboard from '../components/discovery/dashboard';

history.listen((location, action) => {
    // scroll to top when route changes
    window.scrollTo(0, 0);
});

const Routes = () => (
    <Switch>
         <Route exact path="/" component={Dashboard} />
         <Route exact path="/discovery/dashboard" component={DiscoveryDashboard} />
    </Switch>
)

export {
    Routes
}