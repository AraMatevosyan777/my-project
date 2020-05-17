import React from 'react';
import m from './Login.module.css';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../helpers/validators/validators';
import { Input } from '../common/FormsControl/FormsControl';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';

const Login = (props) => {

  const onSubmit = (formData) => {
    let {email,password,rememberMe,captcha} = formData
    props.login(email,password,rememberMe,captcha)
  }
  if(props.isAuth) return <Redirect to='/profile'/>
  return (
    <div className={m.loginForm}>
      <div className={m.loginTitle}>
        <h1>Login to Social Network</h1>
        <h3>Login: aro.matevosyan777@gmail.com</h3>
        <h3>Password: 123456789</h3>
      </div>
      <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
  )
};

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={m.formField}>
        <Field name='email' component={Input} validate={[required]} placeholder='Enter your email' autoComplete="off"/>
      </div>
      <div className={m.formField}>
        <Field name='password'  component={Input} validate={[required]} type='password' placeholder='Password' />
      </div>
      <div className={m.formField}>
      <span>remember me</span>  
      <Field name='rememberMe' component='input' type='checkbox'/>
      </div>
      {props.error && 
      <div className={m.formError}>{props.error}</div>
      }
      {props.captchaUrl && 
        <Captcha captchaUrl={props.captchaUrl}/>
      }
      <div className={m.formField}>
        <button>Login</button>
      </div>
    </form>
  )
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Captcha = (props) => {
  return(
    <div className={m.captcha}>
      <img src={props.captchaUrl} alt=""/>
      <Field component='input' name='captcha' type="text"/>
    </div>
  )
};

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export default connect(mstp,{login})(Login);