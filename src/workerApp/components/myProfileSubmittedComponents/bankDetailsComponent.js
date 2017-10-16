import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import { updateBankDetailsDataOfWorker } from '../../../actions';
import {change, submit} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem'


import _ from 'lodash'













const pay_method = [
  'BANK_TRANSFER',
  'CHEQUE',
  'CASH',
  'PAYPAL',
  'BITCOIN'
]

const pay_frequency = [
  'NEXT_WEEK',
  'SAME_WEEK',
  'NEXT_MONTH',
  'SAME_MONTH'
]


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
        this.props.dispatch(change('bankDetails', 'sort_code', allSortocodeBoxesJoined))
      })
    }
  }
  sortcodeFields(personalDataOfWorkerCopy){
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
            onBlur={(e) => {
              let allSortocodeBoxes = []
              for(let i = 10; i < 13; i++){
                allSortocodeBoxes.push(this.state[`sortcode${i+1}`])
              }
              let allSortocodeBoxesJoined = allSortocodeBoxes.join('')
              let bodyForUpdate = {
                sort_code: allSortocodeBoxesJoined,
                acc_no: personalDataOfWorkerCopy.acc_no,
                pay_method: personalDataOfWorkerCopy.pay_method,
                pay_frequency: personalDataOfWorkerCopy.pay_frequency
              }
              this.props.updateBankDetailsDataOfWorker(bodyForUpdate)
              this.closeAllEdits()
            }}
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
        this.props.dispatch(change('bankDetails', 'acc_no', allBank_account_numbersJoined))
      })
    }
  }















  bankAccountNumberFields(personalDataOfWorkerCopy){
    let result = []
    let ref = 31
    for(let i = 30; i < 38; i++){
      let refStringified = ref.toString()
      if(i < 37){
        result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          maxLength='1' ref={refStringified} style={{width: '9%', marginRight: '8px'}}name=""
          onChange={this.bankAccountNumberOnChange}
        />)
      }
      else{
        result.push(<TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          onBlur={(e) => {
            let allBank_account_numbers = []
            for(let i = 30; i < 38; i++){
              allBank_account_numbers.push(this.state[`bank_account_number${i+1}`])
            }
            let allBank_account_numbersJoined = allBank_account_numbers.join('')
            let bodyForUpdate = {
              sort_code: personalDataOfWorkerCopy.sort_code,
              acc_no: allBank_account_numbersJoined,
              pay_method: personalDataOfWorkerCopy.pay_method,
              pay_frequency: personalDataOfWorkerCopy.pay_frequency
            }
            this.props.updateBankDetailsDataOfWorker(bodyForUpdate)
            this.closeAllEdits()
          }}
          maxLength='1' ref={refStringified} style={{width: '9%', marginRight: '8px'}}name=""
          onChange={this.bankAccountNumberOnChange}
        />)
      }
      ref++
    }
    return <div>{result}</div>
  }










  handleEdit(e,){
    e.preventDefault()
    console.log({e})
  }


  editSortcode(proxy){
    proxy.preventDefault()
    this.setState({editingSortcode: true})
  }
  editBankAccountNumber(proxy){
    proxy.preventDefault()
    this.setState({editingAccNo: true})
  }
  editPayMethod(proxy){
    proxy.preventDefault()
    this.setState({editingPayMethod: true})
  }
  editPayFrequency(proxy){
    proxy.preventDefault()
    this.setState({editingPayFrequency: true})
  }
  closeAllEdits(){
    this.setState({
      editingSortcode: false,
      editingAccNo: false,
      editingPayMethod: false,
      editingPayFrequency: false
    })
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
    let personalDataOfWorkerCopy = {}
    if(this.props.personalDataOfWorker){
      personalDataOfWorkerCopy = {...this.props.personalDataOfWorker[0]}
    }
    return(
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
      <h3><u>{this.context.t('Bank Details')}</u></h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginTop: '15px', marginBottom: '-4px'}}>
            <div>sortcode</div>
            {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].sort_code && !this.state.editingSortcode ?
              <div><span>{this.props.personalDataOfWorker[0].sort_code}</span> 
                <button onClick={this.editSortcode.bind(this)}>EDIT</button>
              </div>
              :
              this.sortcodeFields(personalDataOfWorkerCopy)
            }
          </div>
          <div style={{marginTop: '20px'}}>
            <div>Bank account number</div>
            {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].acc_no && !this.state.editingAccNo ?
              <div><span>{this.props.personalDataOfWorker[0].acc_no}</span> 
                <button onClick={this.editBankAccountNumber.bind(this)}>EDIT</button>
              </div>
              :
              this.bankAccountNumberFields(personalDataOfWorkerCopy)
            }
          </div>
          <div style={{marginTop: '20px'}}>{this.context.t('Payment method')}</div>
          {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].pay_method && !this.state.editingPayMethod ?
            <div><span>{this.props.personalDataOfWorker[0].pay_method}</span> 
              <button onClick={this.editPayMethod.bind(this)}>EDIT</button>
            </div>
            :
            <div>
              <Field name="pay_method" component={SelectField}
                selectedMenuItemStyle={{color: "#00BCD4"}}
                underlineStyle={{display: "none"}}
                errorStyle={{display: "none"}}
                onChange={(e)=>{
                  let finalArray = []
                  finalArray.push(_.map(e, (item)=>{
                      return item
                    }))
                  finalArray[0].pop()
                  let bodyForUpdate = {
                    sort_code: personalDataOfWorkerCopy.sort_code,
                    acc_no: personalDataOfWorkerCopy.acc_no,
                    pay_method: finalArray[0].join(""),
                    pay_frequency: personalDataOfWorkerCopy.pay_frequency
                  }
                  this.props.updateBankDetailsDataOfWorker(bodyForUpdate)
                  this.closeAllEdits()
                }}>
              {pay_method.map(pay_method => <MenuItem value={pay_method} primaryText={pay_method}/>)}
              </Field>
            </div>
          }
          <div style={{marginTop: '20px'}}>{this.context.t('Pay frequency')}</div>
          {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].pay_frequency && !this.state.editingPayFrequency ?
            <div><span>{this.props.personalDataOfWorker[0].pay_frequency}</span> 
              <button onClick={this.editPayFrequency.bind(this)}>EDIT</button>
            </div>
            :
          <div>
            <Field name="pay_frequency" component={SelectField}
              selectedMenuItemStyle={{color: "#00BCD4"}}
              underlineStyle={{display: "none"}}
              errorStyle={{display: "none"}}
              onChange={(e)=>{
                let finalArray = []
                finalArray.push(_.map(e, (item)=>{
                    return item
                  }))
                finalArray[0].pop()
                let bodyForUpdate = {
                  sort_code: personalDataOfWorkerCopy.sort_code,
                  acc_no: personalDataOfWorkerCopy.acc_no,
                  pay_method: personalDataOfWorkerCopy.pay_method,
                  pay_frequency: finalArray[0].join("")
                }
                this.props.updateBankDetailsDataOfWorker(bodyForUpdate)
                this.closeAllEdits()
              }}>
            {pay_frequency.map(pay_frequency => <MenuItem value={pay_frequency} primaryText={pay_frequency}/>)}
            </Field>
          </div>
        }
        </form>
      </div>
    )
  }
}

BankDetailsComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

BankDetailsComponent = reduxForm({
  form: 'bankDetails',
  validate
})(
  connect(null)(
    connect(state => ({
      lang: state.i18nState.lang
    }))(BankDetailsComponent)
  )
)

function mapStateToProps(state) {
  return {
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { updateBankDetailsDataOfWorker })(BankDetailsComponent)
