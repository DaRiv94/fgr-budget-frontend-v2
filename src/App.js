import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFoundPage from './components/common/NotFoundPage';
import HomePage from './components/home/HomePage';
import LinkReLinkPage from './components/link/LinkReLinkPage';
import BudgetsPage from './components/budgets/BudgetsPage';
import RegisterPage from './components/register/RegisterPage';
import Summary from './components/data/Summary';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/linkrelink" component={LinkReLinkPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/budgets" component={BudgetsPage} />
      <ProtectedRoute exact path="/Summary" component={Summary}/>
      <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
