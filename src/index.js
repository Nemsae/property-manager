import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import ClientPage from './components/ClientPage';
import PropertyPage from './components/PropertyPage';

import PropertyStore from './stores/PropertyStore';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='clients' component={ClientPage} />
      <Route path='properties' component={PropertyPage} />
      {/* <Route path='adopted' component={AdoptedAnimals} />
      <Route path='clients' component={TheSaints} /> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
