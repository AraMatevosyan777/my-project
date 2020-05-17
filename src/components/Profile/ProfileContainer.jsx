import React from 'react';
import Profile from './Profile';
import Loader from '../common/Loader/Loader';
import {connect} from 'react-redux';
import { getProfile,getStatus,updateStatus, updatePhoto, updateProfile,getFollow } from '../../redux/profileReducer';
import { follow, unfollow } from '../../redux/usersReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component{

  refreshProfile(){
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = this.props.userId;
      if(!userId){
        this.props.history.push('/login');
      }
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
    this.props.getFollow(userId)
  }
  componentDidMount(){
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.match.params.userId !== this.props.match.params.userId || this.props.userId !== prevProps.userId){
      this.refreshProfile();
    }
  }
  render(){
    if(!this.props.profile) return <Loader/>
    return (
      <Profile profile={this.props.profile} 
      status={this.props.status} 
      updateStatus={this.props.updateStatus}
      updatePhoto={this.props.updatePhoto}
      updateProfile={this.props.updateProfile}
      isOwner={!this.props.match.params.userId}
      isFollowed={this.props.isFollowed}
      follow={this.props.follow}
      unfollow={this.props.unfollow}
      />
    )
  }
};

const mstp = (state) => ({
  loader: state.profilePage.loader,
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.id,
  isAuth: state.auth.isAuth,
  isFollowed: state.profilePage.isFollowed,
})
export default compose(
  withRouter,
  connect(mstp,{getProfile,getStatus,updateStatus,updatePhoto,updateProfile,getFollow, follow, unfollow})
)(ProfileContainer);
