import React from 'react';
import m from '../../Users/users.module.css';

const FollowButton = ({followed,unfollow,follow,userId,followingInProgress}) => {
    return(
            <div className={m.btnBlock}>
               {followed
                ?<button disabled={followingInProgress && followingInProgress.some(id => id===userId)}  
                onClick={() => unfollow(userId)}>Unfollow</button>
                :<button disabled={followingInProgress && followingInProgress.some(id => id===userId)} 
                onClick={() => follow(userId)}>Follow</button>
                } 
            </div>
    )
}

export default FollowButton;