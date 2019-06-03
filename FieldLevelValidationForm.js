import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
//import { parseZone } from 'moment';




  //general
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

  //username
const maxLength15 = maxLength(15)
const name = value => value && /[0-9._%+-]/i.test(value) ? 'invalid name' : undefined
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)

  //email
const email = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

  //age
  const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
  const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined


  //dob
   const dob = value => 
   value && value>new Date() ? 'Must be a number' : undefined
  
  //doj
  const dojfrom = value => 
  value && !isNaN(Number(value)) ? 'Must be a number' : undefined

  //doj
  const dojto = value => 
  value && !isNaN(Number(value)) ? 'Must be a number' : undefined

  //password
  const password = value =>
  value && !/[A-Z0-9a-z$]{8,14}/i.test(value) ?
  'Invalid password' : undefined

   //confirmpassword
   const confirmpassword = value =>{
   if(value === password.value){
   return ("password does not match")
   }}

   //coach type
   const coach = value => value ? 'must select one category' : null

   
    
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span style={{ color: "green" }}>{warning}</span>))}
    </div>
  </div>
)


const renderMembers = ({fields, meta: { touched, error, submitFailed }  }) => {
  console.log(fields)
  return(
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>Add Passenger</button>
        <h4>Max 5 passengers will be allowed</h4>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) =>
        <li key={index}>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}/>
          <h4>Passenger #{index + 1}</h4>
          <Field
            name={`${member}.name`}
            type="text"
            component={renderField}
            validate={[ required, maxLength15, name ]}
            label="Name"/>
          <Field
            name={`${member}.age`}
            type="text"
            component={renderField}
            validate={[ required, number, minValue18 ]}
            label="Age"/>
          
              <div>
          <label>Coach type</label>
          <div>
            <Field name={`${member}.coach`}  validate={[ required,coach]} component="select">
              <option />
              <option value="select">select</option>
              <option value="ac">Ac</option>
              <option value="2s">2S</option>
              <option value="general">General</option>
            </Field>
          </div>
        </div>
        </li>
      )}
    </ul>
  )
}

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
     
      <Field name="username" type="text"
        component={renderField} label="Username "
        validate={[ required, maxLength15, name ]}
      />
      <Field name="email" type="email" nonvalidate
        component={renderField} label="Email"
        validate={[required,email]}
        warn={aol}
      />
      <Field name="age" type="number"
        component={renderField} label="Age"
        validate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <Field name ="dob" type="date"
        component={renderField} label="Date of Birth"
        validate={[required,dob]}
        maxDate={new Date()}
      />
      <Field name="dojfrom" type="date"
      component={renderField} label="From date"
      validate={[required,dojfrom]}
      />
      <Field name="dojto" type="date"
      component={renderField} label="To date"
      validate={[required,dojto]}
      />
      <Field name ="password" type="password"
        component={renderField} label="Password"
        validate={[required,password]}
      />
      <Field name ="confirmpassword" type="password"
        component={renderField} label="Confirm Password"
        validate={[required,confirmpassword]}
      />
       <FieldArray name="Passenger" component={renderMembers}/>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit Form</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)

