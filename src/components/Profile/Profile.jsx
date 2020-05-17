import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileContacts from './ProfileContacts/ProfileContacts';


const Profile = (props) => {
  return (
    <div className='profile'>
        <ProfileInfo profile={props.profile} 
        status={props.status} 
        updateStatus={props.updateStatus}
        updatePhoto={props.updatePhoto}
        isFollowed={props.isFollowed}
        follow={props.follow}
        unfollow={props.unfollow}
        isOwner={props.isOwner}/>
        <ProfileContacts profile={props.profile} updateProfile={props.updateProfile} isOwner={props.isOwner}/>
    </div>
  )
};



export default Profile;
