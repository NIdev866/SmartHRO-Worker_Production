import React, { Component } from "react"
import Paper from 'material-ui/Paper';
import AddressComponent from './myProfileSubmittedComponents/addressComponent'
import BankDetailsComponent from './myProfileSubmittedComponents/bankDetailsComponent'
import TaxComponent from './myProfileSubmittedComponents/taxComponent'
import PersonalDetailsComponent from './myProfileSubmittedComponents/personalDetailsComponent'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { fetchPersonalDataOfWorker } from '../../actions'


class MyProfileParent extends Component{

componentWillMount(){
  this.props.fetchPersonalDataOfWorker()
}

  render(){
    const style = {
      height: 'calc(50vh - 45px)',
      width: "calc(50% - 40px)",
      margin: '10px 20px',
      textAlign: 'center',
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden'
    };

    return(
      <div style={{overflow: 'hidden', margin: '0', width: '100vw', height: 'calc(100vh - 45px'}}>

        {!this.props.authenticated ?
          <Redirect to="/login"/>
          :
          <div>
          <div>
            <Paper style={style} zDepth={2} rounded={false}>
              <PersonalDetailsComponent />
            </Paper>
            <Paper style={style} zDepth={2} rounded={false}>
              <AddressComponent />
            </Paper>
          </div>
          <div>
            <Paper style={style} zDepth={2} rounded={false}>
              <BankDetailsComponent />
            </Paper>
            <Paper style={style} zDepth={2} rounded={false}>
              <TaxComponent />
            </Paper>
          </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { fetchPersonalDataOfWorker })(MyProfileParent)
