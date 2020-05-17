import React from 'react';
import '../Profile.css';
import Status from './status';
import ProfilePhoto from './ProfilePhoto';

const ProfileInfo = (props) => {
  return (
    <div className='profileInfo'>
      <ProfilePhoto profile={props.profile} 
      updatePhoto={props.updatePhoto} 
      isOwner={props.isOwner}
      isFollowed={props.isFollowed}
      unfollow={props.unfollow}
      follow={props.follow}/>
      <Status status={props.status} 
      updateStatus={props.updateStatus} isOwner={props.isOwner}/>
    </div>
  )
};

export default ProfileInfo;