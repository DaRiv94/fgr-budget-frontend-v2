import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFoundPage from './components/common/NotFoundPage';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import LinkBankPageMain from './components/link/LinkBankPageMain';
import BudgetsPageMain from './components/budgets/BudgetsPageMain';
import BudgetFormMain from './components/budgets/BudgetFormMain';
import CategoryFormMain from './components/categories/CategoryFormMain';
import CategoryAssignToTransactionsMain from './components/categories/CategoryAssignToTransactionsMain';
import RegisterPageMain from './components/register/RegisterPageMain';
import SummaryPageMain from './components/data/SummaryPageMain';
import HelpPage from './components/common/HelpPage'
import NewTransactionEmailTemplateExample from './components/notificationExamples/NewTransactionEmailTemplateExample';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Route exact path="/register" component={RegisterPageMain} />
        <ProtectedRoute exact path="/link-bank" component={LinkBankPageMain} />
        <ProtectedRoute exact path="/help" component={HelpPage} />
        <ProtectedRoute exact path="/budgets" component={BudgetsPageMain} />
        <ProtectedRoute exact path="/budgets/create" component={BudgetFormMain} />
        <ProtectedRoute exact path="/budgets/edit/:id" component={BudgetFormMain} />
        <ProtectedRoute exact path="/category/create" component={CategoryFormMain} />
        <ProtectedRoute exact path="/category/edit/:id" component={CategoryFormMain} />
        <ProtectedRoute exact path="/category/assign-to-transaction" component={CategoryAssignToTransactionsMain} />
        <ProtectedRoute exact path="/newtransactionemailtemplateexample" component={NewTransactionEmailTemplateExample} />
        <ProtectedRoute exact path="/summary" component={SummaryPageMain} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
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
