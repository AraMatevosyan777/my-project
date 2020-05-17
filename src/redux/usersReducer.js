import { UsersAPI } from '../api/api';
import { getFollow } from './profileReducer';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_PAGE = 'SET_PAGE';
const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const LOADING = 'LOADING';
const IS_FOLLOWING_PROGRESS = 'IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 12,
    totalCount: 0,
    page: 1,
    loading: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return{
                ...state,
                users: action.users
            }
        case SET_TOTAL_COUNT:
            return{
                ...state,
                totalCount: action.count
            }
        case SET_PAGE:
            return{
                ...state,
                page: action.page
            }
        case LOADING:
            return{
                ...state,
                loading: action.loading
            }
        
        case FOLLOW_TOGGLE:
            return{
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId){
                        return{...user, followed: !user.followed}
                    }
                    return user
                })
            }
        case IS_FOLLOWING_PROGRESS:
            return{
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        
        default:
            return state
    }
}
export default usersReducer;

const setUsers = (users) => ({type: SET_USERS, users});
const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, count});
const setPage = (page) => ({type: SET_PAGE, page});
const followToggle = (userId) => ({type: FOLLOW_TOGGLE, userId});
const loading = (loading) => ({type: LOADING, loading});
const isFollowingProgress = (isFetching,userId) => ({type: IS_FOLLOWING_PROGRESS, isFetching,userId});

export const getUsers = (pageSize,page) => async (dispatch) => {
    dispatch(loading(true))
    dispatch(setPage(page))
    let response = await UsersAPI.getUsers(pageSize,page);
    dispatch(setUsers(response.data.items));
    dispatch(setTotalCount(response.data.totalCount));
    dispatch(loading(false))
}

export const follow = (userId) => async (dispatch) => {
    dispatch(isFollowingProgress(true, userId))
    let response = await UsersAPI.follow(userId);
    if(response.data.resultCode === 0){
        dispatch(followToggle(userId));
        dispatch(getFollow(userId));
    }
    dispatch(isFollowingProgress(false, userId))
}

export const unfollow = (userId) => async (dispatch) => {
    dispatch(isFollowingProgress(true, userId))
    let response = await UsersAPI.unfollow(userId);
    if(response.data.resultCode === 0){
        dispatch(followToggle(userId));
        dispatch(getFollow(userId));
    }
    dispatch(isFollowingProgress(false, userId))
}

