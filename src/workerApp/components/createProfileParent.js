import React, { Component } from "react"
import Paper from 'material-ui/Paper';
import AddressComponent from './myProfileComponents/addressComponent'
import BankDetailsComponent from './myProfileComponents/bankDetailsComponent'
import TaxComponent from './myProfileComponents/taxComponent'
import PersonalDetailsComponent from './myProfileComponents/personalDetailsComponent'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress';

import RaisedButton from 'material-ui/RaisedButton'
import { Link } from "react-router-dom"


class MyProfileParent extends Component{
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

    const worker_id = localStorage.getItem('worker_id');

    if(this.props.match.url !== `/${worker_id}/createprofile`){
      return <Redirect to={`/${worker_id}/createprofile`}/>
    }


    return(
      <div style={{overflow: 'hidden', margin: '0', width: '100vw', height: 'calc(100vh - 45px'}}>

        <div style={{marginTop: '250px', backgroundColor: 'red', position: 'absolute', right: '40px', bottom: '70px'}}>
          <Link to={`/${worker_id}/myprofile`}>
            <RaisedButton
              type="submit"
              label='Submit'
              primary={true}
            />
          </Link>
        </div>

        {!this.props.authenticated ?
          <Redirect to="/login"/>
          :
          <div>
          <div>
            <Paper style={style} zDepth={2} rounded={false}>
              {/* <div style={{width: '25px', height: '25px', position: 'absolute', right: '10px', top: '10px'}}>
                <CircularProgress size={20} />
              </div> */}
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
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(MyProfileParent)
