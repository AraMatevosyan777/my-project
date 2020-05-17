import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {getUsers,follow,unfollow} from '../../redux/usersReducer';
 
class UsersContainer extends React.Component{
    componentDidMount(){
        this.props.getUsers(this.props.pageSize, this.props.page)
    }
    setPage = (page) => {
        this.props.getUsers(this.props.pageSize, page)
    }

    render() {
        return (
            <Users users={this.props.users} 
            totalCount={this.props.totalCount}
            pageSize={this.props.pageSize}
            page={this.props.page}
            setPage={this.setPage}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            loading={this.props.loading}
            followingInProgress={this.props.followingInProgress}
             />
        )
    }

}

const mstp = (state) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    page: state.usersPage.page,
    totalCount: state.usersPage.totalCount,
    loading: state.usersPage.loading,
    followingInProgress: state.usersPage.followingInProgress,
})

export default connect(mstp, {getUsers,follow,unfollow})(UsersContainer);