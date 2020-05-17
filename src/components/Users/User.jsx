import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import m from './users.module.css';
import { NavLink } from 'react-router-dom';
import FollowButton from '../common/FollowButton/FollowButton';

const User = (props) => {
    return(
        <div className={m.user}>
            <div className={m.userPhoto}>
                <NavLink to={'/profile/' + props.user.id}>
                    <img src={props.user.photos.small || userPhoto} alt={props.user.name}/>
                </NavLink>
            </div>
            <h3>{props.user.name}</h3>
            <div className={m.status}>
                <p>{props.user.status}</p>
            </div>
            <FollowButton followed={props.user.followed}
            unfollow={props.unfollow}
            follow={props.follow}
            userId={props.user.id}
            followingInProgress={props.followingInProgress}
            />
            {/* <div className={m.btnBlock}>
               {props.user.followed
                ?<button disabled={props.followingInProgress.some(id => id===props.user.id)}  
                onClick={() => props.unfollow(props.user.id)}>Unfollow</button>
                :<button disabled={props.followingInProgress.some(id => id===props.user.id)} 
                onClick={() => props.follow(props.user.id)}>Follow</button>
                } 
            </div> */}
            
        </div>
    )
}

export default User;