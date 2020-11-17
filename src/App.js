import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFoundPage from './components/common/NotFoundPage';
import HomePage from './components/home/HomePage';
import LinkReLinkPage from './components/link/LinkReLinkPage';
import BudgetsPage from './components/budgets/BudgetsPage';
import BudgetForm from './components/budgets/BudgetForm';
import CategoryForm from './components/categories/CategoryForm';
import RegisterPage from './components/register/RegisterPage';
import Summary from './components/data/Summary';
import NewTransactionEmailTemplateExample from './components/notificationExamples/NewTransactionEmailTemplateExample';
// import './App.css';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <ProtectedRoute exact path="/linkrelink" component={LinkReLinkPage} />
      <ProtectedRoute exact path="/budgets" component={BudgetsPage} />
      <ProtectedRoute exact path="/budgets/create" component={BudgetForm} />
      <ProtectedRoute exact path="/category/create" component={CategoryForm} />
      <ProtectedRoute exact path="/newtransactionemailtemplateexample" component={NewTransactionEmailTemplateExample}/>
      <ProtectedRoute exact path="/Summary" component={Summary}/>
      <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
