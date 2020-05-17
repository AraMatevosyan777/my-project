import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render(){
            if(!this.props.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }
    const mstp = (state) => ({
        isAuth: state.auth.isAuth,
    })
    return connect(mstp)(RedirectComponent);
}