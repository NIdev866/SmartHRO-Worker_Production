import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect, withRouter } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin'
import Progress from "./workerApp/components/progress"
import Myprofile from "./workerApp/components/myProfileParent"

import Myprofilesubmitted from './workerApp/components/myProfileParentSubmitted'

import Jobs from "./workerApp/components/jobs"
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import WorkerParent from "./workerApp/workerParent"
import Signin from './workerApp/auth/signin'
import SignupComponent from './workerApp/signup/signupComponent'
import RequireAuth from './workerApp/auth/require_auth'


import I18n from "redux-i18n"

import {translations} from "./translations"


var Nav = require("./workerApp/Nav"); EXAMPLE


injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));




const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations}>
      <MuiThemeProvider>
        <BrowserRouter>
            <Nav /> EXAMPLE
              <Switch>
                <Route path='/:worker_id/signup' component={SignupComponent} />
                <Route path="/:worker_id/jobs" component={RequireAuth(Jobs)}/>
                <Route path="/:worker_id/progress" component={RequireAuth(Progress)}/>
                <Route path="/:worker_id/myprofile" component={RequireAuth(Myprofile)}/>
                <Route path="/:worker_id/myprofilesubmitted" component={RequireAuth(Myprofilesubmitted)}/>
                <Route path='/login' component={Signin} />
                <Route path='/' component={WorkerParent} />



              </Switch>

        </BrowserRouter>
      </MuiThemeProvider>
    </I18n>
  </Provider>
  , document.getElementById('root'));


  //
