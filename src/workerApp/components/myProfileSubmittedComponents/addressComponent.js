import React, { Component, PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../form_material_styles'
import renderField from '../../renderField'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {change, submit} from 'redux-form'
import validate from '../validate'
import TextField from 'material-ui/TextField'
import AvatarCropper from "react-avatar-cropper";
import ReactDom from "react-dom";


import addresssubmit from "./submitActions/addressSubmit"


import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import DatePicker from 'material-ui/DatePicker';




const HouseFlatNumberComponent = ({input, dispatch})=>(
  <TextField inputStyle={{textAlign: 'center'}} type="text"
          onBlur={() => dispatch(submit('addressDetails'))}
    maxLength='5' style={{width: '15%', marginRight: '0px'}}
    {...input}
  />
)

const RoadCourtBuildingCountyNameComponent = ({input, dispatch})=>(
  <TextField inputStyle={{textAlign: 'left'}} type="text"
          onBlur={() => dispatch(submit('addressDetails'))}
    maxLength='70' style={{width: '50%', marginRight: '0px'}}
    {...input}
  />
)

const HouseChosen = ({dispatch, context})=>(
  <div>
    <div style={{marginTop: '15px', marginBottom: '-4px'}}>
    <div>{context.t('House number')}</div>
    <Field
      onBlur={() => dispatch(submit('addressDetails'))}
      name="house_no"
      type="text"
      dispatch={dispatch}
      component={HouseFlatNumberComponent}
    />
    </div>
  </div>
)

const FlatChosen = ({dispatch, context})=>(
  <div>
    <div style={{marginTop: '15px', marginBottom: '-4px'}}>
    <div>{context.t('Flat number')}</div>
    <Field
      onBlur={() => dispatch(submit('addressDetails'))}
      name="flat_no"
      type="text"
      dispatch={dispatch}
      component={HouseFlatNumberComponent}
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
  postal_codeFields(){
    let result = []
    let ref = 21
    for(let i = 20; i < 22; i++){
      let refStringified = ref.toString()
      if(i < 21){
        result.push(
          <span>
          <TextField id={refStringified} inputStyle={{textAlign: 'center'}} type="text"
          onBlur={() => this.props.dispatch(submit('addressDetails'))}
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
            &mdash;
          </span>
        )
      }
      else{
        result.push(
          <TextField onBlur={() => this.props.dispatch(submit('addressDetails'))} id={refStringified}
          inputStyle={{textAlign: 'center'}} type="text"
          maxLength='5' ref={refStringified} style={{width: '15%', marginRight: '0px'}}name=""
          onChange={this.postal_codeOnChange}/>
        )
      }
      ref++
    }
    return <div>{result}</div>
  }
  houseOrFlatChosen(){
    if(this.props.house_or_flat === "house"){
      return <HouseChosen dispatch={this.props.dispatch} context={this.context}/>
    }
    else if(this.props.house_or_flat === "flat"){
      return <FlatChosen dispatch={this.props.dispatch} context={this.context}/>
    }
  }



  handleEdit(e,){
    e.preventDefault()
    console.log({e})
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
      <div style={{position: 'absolute', width: '100%', height: '100%', padding: 0}}>
        <div style={{height: '30px', margin: 0}}>
        <h3 style={{margin: 0, padding: 0, paddingTop: '10px'}}><u>{this.context.t('Address')}</u></h3>
        </div>
        <div style={{position: 'relative', display: 'inline-block', width: '100%', height: 'calc(100% - 30px)'}}>
          <form>
            <div style={{float: 'left', width: '50%', height: '100%', }}>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 1')}</div>


              {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].address_road1 ?
                <div><span>{this.props.personalDataOfWorker[0].address_road1}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                :
                <Field
                  onBlur={() => this.props.dispatch(submit('addressDetails'))}
                  name="address_road1"
                  type="text"
                  component={RoadCourtBuildingCountyNameComponent}
                />
              }


              </div>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 2')}</div>

                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].address_road2 ?
                  <div><span>{this.props.personalDataOfWorker[0].address_road2}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                  :

                  <Field
                    onBlur={() => this.props.dispatch(submit('addressDetails'))}
                    name="address_road2"
                    type="text"
                    component={RoadCourtBuildingCountyNameComponent}
                  />
                }



              </div>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Address line 3')}</div>

                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].address_road3 ?
                  <div><span>{this.props.personalDataOfWorker[0].address_road3}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                  :


                  <Field
                    onBlur={() => this.props.dispatch(submit('addressDetails'))}
                    name="address_road3"
                    type="text"
                    component={RoadCourtBuildingCountyNameComponent}
                  />

                }

              </div>
              <div style={{marginTop: '15px', marginBottom: '-4px'}}>
                <div>{this.context.t('Postal code')}</div>


                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].postal_code ?
                  <div><span>{this.props.personalDataOfWorker[0].postal_code}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                  :


                  this.postal_codeFields()

                }


              </div>
{/*              <div>
                <div style={{marginTop: '10px'}}>Building name</div>
                <Field
                  onBlur={() => this.props.dispatch(submit('addressDetails'))}
                  name="building_name"
                  type="text"
                  component={RoadCourtBuildingCountyNameComponent}
                />
              </div>
              <Field name="building_name" component={renderError} />*/}
            </div>
            <div style={{float: 'right', width: '50%', height: '100%'}}>

              {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].house_no ?
                <div><div>House no: </div><span>{this.props.personalDataOfWorker[0].house_no}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
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


              {this.houseOrFlatChosen()}
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('Town')}</div>


                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].town ?
                  <div><span>{this.props.personalDataOfWorker[0].town}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                  :

                  <Field
                    onBlur={() => this.props.dispatch(submit('addressDetails'))}
                    name="town"
                    type="text"
                    component={RoadCourtBuildingCountyNameComponent}
                  />

                }

              </div>
              <div>
                <div style={{marginTop: '10px'}}>{this.context.t('County')}</div>


                {this.props.personalDataOfWorker && this.props.personalDataOfWorker[0].county ?
                  <div><span>{this.props.personalDataOfWorker[0].county}</span> <button onClick={this.handleEdit.bind(this)}>EDIT</button></div>
                  :


                <Field
                  onBlur={() => this.props.dispatch(submit('addressDetails'))}
                  name="county"
                  type="text"
                  component={RoadCourtBuildingCountyNameComponent}
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
  onSubmit: addresssubmit
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

export default connect(mapStateToProps)(AddressComponent)
