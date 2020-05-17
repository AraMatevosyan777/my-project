import React from 'react';
import userPhoto from '../../../assets/images/user.jpg';
import FollowButton from '../../common/FollowButton/FollowButton';

const ProfilePhoto = (props) => {
  return (
    <div className='profilePhoto'>
      <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt='' />
      {props.isOwner
        &&
        <div className='photoInput'>
          <input type='file' onChange={(e) => props.updatePhoto(e.target.files[0])} />
          <div>click to change photo</div>
        </div>
      }
      {!props.isOwner &&
        <div className='followingBlock'>
          <FollowButton followed={props.isFollowed}
            unfollow={props.unfollow}
            follow={props.follow}
            userId={props.profile.userId} />
        </div>
      }

    </div>
  )
};



export default ProfilePhoto;
