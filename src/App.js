import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appreducer';
import Loader from './components/common/Loader/Loader';
import { compose } from 'redux';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <Loader />
    return (
      <div className="App">
        <HeaderContainer />
        <div className='container'>
          <NavBar />
          <div className="Content">
            <Route path="/" render={() => <Redirect to='/profile'/>} />
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </div>
    );
  }
}
const mstp = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
})
export default compose(
  withRouter,
  connect(mstp, { initializeApp })
)(App);




