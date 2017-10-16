import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import { updateAddressDataOfWorker } from '../../../actions';
import {change, submit} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';







class RoadCourtBuildingCountyNameComponent extends Component{
  render(){
    return(
      <TextField inputStyle={{textAlign: 'left'}} type="text"

        maxLength='70' style={{width: '50%', marginRight: '0px'}}
        {...this.props.input}
      />
    )
  }
}









const HouseChosen = ({dispatch, context, closeAllEdits, updateAddressDataOfWorker, personalDataOfWorkerCopy})=>(
  <div>
    <div style={{marginTop: '15px', marginBottom: '-4px'}}>
    <div>{context.t('House number')}</div>


    <TextField inputStyle={{textAlign: 'center'}} type="text"

      onBlur={(e) => {
        let bodyForUpdate = {
          address_road1: personalDataOfWorkerCopy.address_road1,
          address_road2: personalDataOfWorkerCopy.address_road2,
          address_road3: personalDataOfWorkerCopy.address_road3,
          postal_code: personalDataOfWorkerCopy.postal_code,
          house_no: e.target.value,
          flat_no: personalDataOfWorkerCopy.flat_no,
          town: personalDataOfWorkerCopy.town,
          county: personalDataOfWorkerCopy.county,
        }
        updateAddressDataOfWorker(bodyForUpdate)
        closeAllEdits()
      }}

      maxLength='5' style={{width: '15%', marginRight: '0px'}}
    />
    </div>
  </div>
)

const FlatChosen = ({dispatch, context, closeAllEdits, updateAddressDataOfWorker})=>(
  <div>
    <div style={{marginTop: '15px', marginBottom: '-4px'}}>
    <div>{context.t('Flat number')}</div>
    <Field
      onBlur={() => {
        closeAllEdits()
      }}
      name="flat_no"
      type="text"
      dispatch={dispatch}
      //component={HouseFlatNumberComponent}
    />
    </div>
  </div>
)













class AddressComponent extends Component{
  constructor(props){
    super(props)
    this.postal_codeOnChange = this.postal_codeOnChange.bind(this)
    this.houseOrFlatChosen = this.houseOrFlatChosen.bind(this)
    this.state = {
      'postal_code21':'',
      'postal_code22':'',
    }
    this.closeAllEdits = this.closeAllEdits.bind(this)
  }
  postal_codeOnChange(event) {
    event.target.value = event.target.value.toUpperCase()
    let stateToChange = `postal_code${event.target.id}`
    this.setState({[stateToChange]: event.target.value}, ()=>{
      let allPostal_codeBoxes = []
      for(let i = 20; i < 22; i++){
        allPostal_codeBoxes.push(this.state[`postal_code${i+1}`])
      }
      let allPostal_codeBoxesJoined = allPostal_codeBoxes.join('')
      this.props.dispatch(change('addressDetails', 'postal_code', allPostal_codeBoxesJoined))
    })
  }
  postal_codeFields(personalDataOfWorkerCopy){
    let result = []
    let ref = 21
    for(let i = 20; i < 22; i++){
      let refStringified = ref.toString()
      if(i < 21){
        result.push(
          <span>
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
            &mdash;
          </span>
        )
      }
      else{
        result.push(
          <TextField 
            id={refStringified}
            inputStyle={{textAlign: 'center'}} type="text"
            onBlur={(e) => {
              let bodyForUpdate = {
                address_road1: personalDataOfWorkerCopy.address_road1,
                address_road2: personalDataOfWorkerCopy.address_road2,
                address_road3: personalDataOfWorkerCopy.address_road3,

                postal_code: 'sl22rr', //not changeable with /worker/add-address/${worker_id}''

                house_no: personalDataOfWorkerCopy.house_no,
                flat_no: personalDataOfWorkerCopy.flat_no,
                town: personalDataOfWorkerCopy.town,
                county: personalDataOfWorkerCopy.county,
              }

              this.props.updateAddressDataOfWorker(bodyForUpdate)
              this.closeAllEdits()
            }}
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
        )
      }
      ref++
    }
    return <div>{result}</div>
  }












  houseOrFlatChosen(personalDataOfWorkerCopy){

    if(this.state.editingHouseNo){

      if(this.props.house_or_flat === "house"){
        return <HouseChosen 
          closeAllEdits={this.closeAllEdits} 
          dispatch={this.props.dispatch} 
          context={this.context}
          updateAddressDataOfWorker={this.props.updateAddressDataOfWorker}
          personalDataOfWorkerCopy={personalDataOfWorkerCopy}
        />
      }
      else if(this.props.house_or_flat === "flat"){
        return <FlatChosen 
          closeAllEdits={this.closeAllEdits} 
          dispatch={this.props.dispatch} 
          context={this.context}
          updateAddressDataOfWorker={this.props.updateAddressDataOfWorker}
          personalDataOfWorkerCopy={personalDataOfWorkerCopy}
        />
      }

    }
  }











  editAddress1(proxy){
    proxy.preventDefault()
    this.setState({editingAddress1: true})
  }
  editAddress2(proxy){
    proxy.preventDefault()
    this.setState({editingAddress2: true})
  }
  editAddress3(proxy){
    proxy.preventDefault()
    this.setState({editingAddress3: true})
  }
  editPostalCode(proxy){
    proxy.preventDefault()
    this.setState({editingPostalCode: true})
  }
  editHouseNo(proxy){
    proxy.preventDefault()

    this.setState({editingHouseNo: true})
  }
  editTown(proxy){
    proxy.preventDefault()
    this.setState({editingTown: true})
  }
  editCounty(proxy){
    proxy.preventDefault()
    this.setState({editingCounty: true})
  }
  closeAllEdits(){
    this.setState({
      editingAddress1: false,
      editingAddress2: false,
      editingAddress3: false,
      editingPostalCode: false,
      editingHouseNo: false,
      editingTown: false,
      editingCounty: false
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
      <div style={{position: 'absolute', width: '100%', height: '100%', padding: 0}}>
        <div style={{height: '30px', margin: 0}}>
        <h3 style={{margin: 0, padding: 0, paddingTop: '10px'}}><u>{this.context.t('Address')}</u></h3>
        </div>
        <div style={{position: 'relative', display: 'inline-block', width: '100%', height: 'calc(100% - 30px)'}}>
          <form>
            <div style={{float: 'left', width: '50%', height: '100%', }}>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 1')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road1 && !this.state.editingAddress1 ?
                  <div><span>{personalDataOfWorkerCopy.address_road1}</span> 
                    <button onClick={this.editAddress1.bind(this)}>EDIT</button>
                  </div>
                  :
                  <TextField inputStyle={{textAlign: 'left'}} type="text"
                    onBlur={(e) => {
                      let bodyForUpdate = {
                        address_road1: e.target.value,
                        address_road2: personalDataOfWorkerCopy.address_road2,
                        address_road3: personalDataOfWorkerCopy.address_road3,
                        postal_code: personalDataOfWorkerCopy.postal_code,
                        house_no: personalDataOfWorkerCopy.house_no,
                        flat_no: personalDataOfWorkerCopy.flat_no,
                        town: personalDataOfWorkerCopy.town,
                        county: personalDataOfWorkerCopy.county,
                      }
                      this.props.updateAddressDataOfWorker(bodyForUpdate)
                      this.closeAllEdits()
                    }}
                    maxLength='70' style={{width: '50%', marginRight: '0px'}}
                  />
                }
              </div>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 2')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road2 && !this.state.editingAddress2 ?
                  <div><span>{personalDataOfWorkerCopy.address_road2}</span> 
                    <button onClick={this.editAddress2.bind(this)}>EDIT</button>
                  </div>
                  :
                  <TextField inputStyle={{textAlign: 'left'}} type="text"
                    onBlur={(e) => {
                      let bodyForUpdate = {
                        address_road1: personalDataOfWorkerCopy.address_road1,
                        address_road2: e.target.value,
                        address_road3: personalDataOfWorkerCopy.address_road3,
                        postal_code: personalDataOfWorkerCopy.postal_code,
                        house_no: personalDataOfWorkerCopy.house_no,
                        flat_no: personalDataOfWorkerCopy.flat_no,
                        town: personalDataOfWorkerCopy.town,
                        county: personalDataOfWorkerCopy.county,
                      }
                      this.props.updateAddressDataOfWorker(bodyForUpdate)
                      this.closeAllEdits()
                    }}
                    maxLength='70' style={{width: '50%', marginRight: '0px'}}
                  />
                }
              </div>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 3')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.address_road3 && !this.state.editingAddress3 ?
                  <div><span>{personalDataOfWorkerCopy.address_road3}</span> 
                    <button onClick={this.editAddress3.bind(this)}>EDIT</button>
                  </div>
                  :
                  <TextField inputStyle={{textAlign: 'left'}} type="text"
                    onBlur={(e) => {
                      let bodyForUpdate = {
                        address_road1: personalDataOfWorkerCopy.address_road1,
                        address_road2: personalDataOfWorkerCopy.address_road2,
                        address_road3: e.target.value,
                        postal_code: personalDataOfWorkerCopy.postal_code,
                        house_no: personalDataOfWorkerCopy.house_no,
                        flat_no: personalDataOfWorkerCopy.flat_no,
                        town: personalDataOfWorkerCopy.town,
                        county: personalDataOfWorkerCopy.county,
                      }
                      this.props.updateAddressDataOfWorker(bodyForUpdate)
                      this.closeAllEdits()
                    }}
                    maxLength='70' style={{width: '50%', marginRight: '0px'}}
                  />
                }
              </div>
              <div style={{marginTop: '15px', marginBottom: '-4px'}}>
                <div>{this.context.t('Postal code')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.postal_code && !this.state.editingPostalCode ?
                  <div><span>{personalDataOfWorkerCopy.postal_code}</span>
                    <button onClick={this.editPostalCode.bind(this)}>EDIT</button>
                  </div>
                  :
                  this.postal_codeFields(personalDataOfWorkerCopy)
                }
              </div>
            </div>
            <div style={{float: 'right', width: '50%', height: '100%'}}>








              {personalDataOfWorkerCopy && personalDataOfWorkerCopy.house_no && !this.state.editingHouseNo ? 
                <div>
                  <div><div>House no: </div><span>{personalDataOfWorkerCopy.house_no}</span> 
                    <button onClick={this.editHouseNo.bind(this)}>EDIT</button>
                  </div>
                </div>

                :

                <div>
                  <div style={{marginBottom: "-30px"}}>{this.context.t('Do you live in a house or a flat?')}</div>
                  <div style={radiosParentDiv}>
                    <Field style={houseFlatChooserStyle} name="house_or_flat" component={RadioButtonGroup}>
                      <RadioButton disableTouchRipple style={houseStyle} value="house"/>
                      <RadioButton disableTouchRipple style={flatStyle} value="flat"/>
                    </Field>
                    <div style={{...houseFlatChooserStyle, marginLeft: "-10px"}}>
                      <span style={{marginRight: "72px"}}>{this.context.t('House')}</span><span>{this.context.t('Flat')}</span>
                    </div>
                  </div>
                </div>

              }

              {this.houseOrFlatChosen(personalDataOfWorkerCopy)}










              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Town')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.town && !this.state.editingTown ?
                  <div><span>{personalDataOfWorkerCopy.town}</span> 
                    <button onClick={this.editTown.bind(this)}>EDIT</button>
                  </div>
                  :
                  <TextField inputStyle={{textAlign: 'left'}} type="text"
                    onBlur={(e) => {
                      let bodyForUpdate = {
                        address_road1: personalDataOfWorkerCopy.address_road1,
                        address_road2: personalDataOfWorkerCopy.address_road2,
                        address_road3: personalDataOfWorkerCopy.address_road3,
                        postal_code: personalDataOfWorkerCopy.postal_code,
                        house_no: personalDataOfWorkerCopy.house_no,
                        flat_no: personalDataOfWorkerCopy.flat_no,

                          //NOT WORKING
                        town: e.target.value,

                        county: personalDataOfWorkerCopy.county,
                      }

                        

                      this.props.updateAddressDataOfWorker(bodyForUpdate)
                      this.closeAllEdits()
                    }}
                    maxLength='70' style={{width: '50%', marginRight: '0px'}}
                  />
                }
              </div>
              <div> 
                <div style={{marginTop: '10px'}}>{this.context.t('County')}</div>
                {personalDataOfWorkerCopy && personalDataOfWorkerCopy.county && !this.state.editingCounty ?
                  <div><span>{personalDataOfWorkerCopy.county}</span> 
                    <button onClick={this.editCounty.bind(this)}>EDIT</button>
                  </div>
                  :
                  <TextField inputStyle={{textAlign: 'left'}} type="text"
                    onBlur={(e) => {
                      let bodyForUpdate = {
                        address_road1: personalDataOfWorkerCopy.address_road1,
                        address_road2: personalDataOfWorkerCopy.address_road2,
                        address_road3: personalDataOfWorkerCopy.address_road3,
                        postal_code: personalDataOfWorkerCopy.postal_code,
                        house_no: personalDataOfWorkerCopy.house_no,
                        flat_no: personalDataOfWorkerCopy.flat_no,
                        town: personalDataOfWorkerCopy.town,
                        county: e.target.value,
                      }
                      this.props.updateAddressDataOfWorker(bodyForUpdate)
                      this.closeAllEdits()
                    }}
                    maxLength='70' style={{width: '50%', marginRight: '0px'}}
                  />
              }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

AddressComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

AddressComponent = reduxForm({
  form: 'addressDetails',
  validate,
})(AddressComponent)

const selector = formValueSelector('addressDetails') // <-- same as form name
AddressComponent = connect(
  state => {
    const house_or_flat = selector(state, 'house_or_flat')
    return {
      house_or_flat
    }
  }
)(
  connect(state => ({
    lang: state.i18nState.lang
  }))(AddressComponent)
)

function mapStateToProps(state) {
  return {
    personalDataOfWorker: state.main.personalDataOfWorker
  };
}

export default connect(mapStateToProps, { updateAddressDataOfWorker })(AddressComponent)
