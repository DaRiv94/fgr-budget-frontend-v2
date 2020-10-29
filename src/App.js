import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFoundPage from './components/common/NotFoundPage';
import HomePage from './components/home/HomePage';
import LinkReLinkPage from './components/link/LinkReLinkPage';
import Summary from './components/data/Summary';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/linkrelink" component={LinkReLinkPage} />
      <ProtectedRoute exact path="/Summary" component={Summary}/>
      <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
