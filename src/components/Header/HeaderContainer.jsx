import React from 'react';
import { logout } from '../../redux/authReducer';
import { connect } from 'react-redux';
import Header from './Header';

class HeaderContainer extends React.Component{

  render(){
    return(
      <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
    )
  }
}

const mstp = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mstp,{logout})(HeaderContainer);
