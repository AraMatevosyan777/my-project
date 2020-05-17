import React from 'react';
import User from './User';
import m from './users.module.css';
import Paginator from '../common/Paginator/Paginator';
import Loader from '../common/Loader/Loader';

const Users = (props) => {

    return(
        <div className={m.users}>

            <Paginator totalCount={props.totalCount}
             pageSize={props.pageSize} 
             setPage={props.setPage} 
             page={props.page}/>
             
            {props.loading
            ?<Loader/>
            :props.users.map(user => 
            <User key={user.id} 
            user={user} 
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}
            />)}
        </div>
    )
}

export default Users;