import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFoundPage from './components/common/NotFoundPage';
import HomePage from './components/home/HomePage';
import LinkReLinkPage from './components/link/LinkReLinkPage';
import BudgetsPageMain from './components/budgets/BudgetsPageMain';
import BudgetForm from './components/budgets/BudgetForm';
import CategoryForm from './components/categories/CategoryForm';
import CategoryAssignToTransactionsMain from './components/categories/CategoryAssignToTransactionsMain';
import RegisterPageMain from './components/register/RegisterPageMain';
import SummaryPageMain from './components/data/SummaryPageMain';
import HelpPage from './components/common/HelpPage'
import NewTransactionEmailTemplateExample from './components/notificationExamples/NewTransactionEmailTemplateExample';
// import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Switch>
      {/* <Route exact path="/" component={HomePage} /> */}
      <Route exact path="/" render={(props) => <HomePage {...props}/>}/>
      <Route exact path="/register" component={RegisterPageMain} />
      <ProtectedRoute exact path="/linkrelink" component={LinkReLinkPage} />
      <ProtectedRoute exact path="/help" component={HelpPage} />
      <ProtectedRoute exact path="/budgets" component={BudgetsPageMain} />
      <ProtectedRoute exact path="/budgets/create" component={BudgetForm} />
      <ProtectedRoute exact path="/budgets/edit/:id" component={BudgetForm} />
      <ProtectedRoute exact path="/category/create" component={CategoryForm} />
      <ProtectedRoute exact path="/category/edit/:id" component={CategoryForm} />
      <ProtectedRoute exact path="/category/assign-to-transaction" component={CategoryAssignToTransactionsMain} />
      <ProtectedRoute exact path="/newtransactionemailtemplateexample" component={NewTransactionEmailTemplateExample}/>
      <ProtectedRoute exact path="/summary" component={SummaryPageMain}/>
      <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer
                        newestOnTop={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                    />
    </div>
  );
}

export default App;
