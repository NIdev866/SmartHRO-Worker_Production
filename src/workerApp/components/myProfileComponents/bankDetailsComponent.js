import React, { Component } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {change} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import bankDetailsSubmit from "./submitActions/bankDetailsSubmit"
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';





const renderError = ({ input, meta: { error } }) => (
  <div style={{color: "red", fontSize: '14px', marginBottom: '25px'}}>
    {error ? <span>{error}</span> : ""}
  </div>
)


class BankDetailsComponent extends Component{
  constructor(props){
    super(props)
    this.sortcodeOnChange = this.sortcodeOnChange.bind(this)
    this.bankAccountNumberOnChange = this.bankAccountNumberOnChange.bind(this)
    this.state = {
      'sortcode11':'',
      'sortcode12':'',
      'sortcode13':'',
      'bank_account_number31':'',
      'bank_account_number32':'',
      'bank_account_number33':'',
      'bank_account_number34':'',
      'bank_account_number35':'',
      'bank_account_number36':'',
      'bank_account_number37':'',
      'bank_account_number38':'',
    }
  }



  sortcodeOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    if (event.target.value.length === event.target.maxLength && event.target.id !== '14') {
      if (event.target.value.length === event.target.maxLength && event.target.id !== '13') {
        this.refs[parseInt(event.target.id, 10) + 1].focus();
      }
      let stateToChange = `sortcode${event.target.id}`
      this.setState({[stateToChange]: event.target.value}, ()=>{ 
        let allSortocodeBoxes = []
        for(let i = 10; i < 13; i++){
          allSortocodeBoxes.push(this.state[`sortcode${i+1}`])
        }
        let allSortocodeBoxesJoined = allSortocodeBoxes.join('')
        this.props.dispatch(change('bankDetails', 'sortcode', allSortocodeBoxesJoined))
      })
    }
  }
  sortcodeFields(){
    let result = []
    let ref = 11
    for(let i = 10; i < 13; i++){
      let refStringified = ref.toString()
      if(i < 12){
        result.push(
          <span>
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text" 
          maxLength='2' ref={refStringified} style={{width: '12%', marginRight: '0px'}}name="" 
          onChange={this.sortcodeOnChange}/>
            &mdash;
          </span>
        )
      }
      else{
        result.push(
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text" 
          maxLength='2' ref={refStringified} style={{width: '12%', marginRight: '0px'}}name="" 
          onChange={this.sortcodeOnChange}/>
        )
      }
      ref++
    }
    return <div>{result}</div>
  }
  bankAccountNumberOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    if (event.target.value.length === event.target.maxLength && event.target.id !== '39') {
      if (event.target.value.length === event.target.maxLength && event.target.id !== '38') {
        this.refs[parseInt(event.target.id, 10) + 1].focus();
      }
      let stateToChange = `bank_account_number${event.target.id}`
      this.setState({[stateToChange]: event.target.value}, ()=>{ 
        let allBank_account_numbers = []
        for(let i = 30; i < 38; i++){
          allBank_account_numbers.push(this.state[`bank_account_number${i+1}`])
        }
        let allBank_account_numbersJoined = allBank_account_numbers.join('')
        this.props.dispatch(change('bankDetails', 'bank_account_number', allBank_account_numbersJoined))
      })
    }
  }
  bankAccountNumberFields(){
    let result = []
    let ref = 31
    for(let i = 30; i < 38; i++){
      let refStringified = ref.toString()
      result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text" 
        maxLength='1' ref={refStringified} style={{width: '9%', marginRight: '8px'}}name="" 
        onChange={this.bankAccountNumberOnChange}/>)
      ref++
    }
    return <div>{result}</div>
  }



  render(){    
  	const { handleSubmit } = this.props;   
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const houseFlatChooserStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative",
    }
    const houseStyle = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px"
    }
    const flatStyle = {
      display: "inline-block",
      width: "45px",
      marginLeft: "30px"
    }

    return(
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>

      <h3><u>Bank Details</u></h3>

        <form onSubmit={handleSubmit}>
          <div style={{marginTop: '15px', marginBottom: '-4px'}}>
            <div>sortcode</div>
              {this.sortcodeFields()}
          </div>
          <Field name="sortcode" component={renderError} />
          <div>
            <div>Bank account number</div>
              {this.bankAccountNumberFields()}
          </div>
          <Field name="bank_account_number" component={renderError} />
        </form>

      </div>
    )
  }
}

BankDetailsComponent = reduxForm({
  form: 'bankDetails',
  validate,
  onSubmit: bankDetailsSubmit
})(BankDetailsComponent)

export default BankDetailsComponent
