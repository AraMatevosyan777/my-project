import { ProfileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';
const SET_IS_FOLLOWED = 'SET_IS_FOLLOWED';

let initialState = {
    profile: null,
    status: '',
    loader: false,
    isFollowed: false,
}


export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PROFILE:
            return{
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return{
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return{
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case SET_IS_FOLLOWED:
            return{
                ...state,
                isFollowed: action.followed
            }
        default:
            return state
    };
}

const setProfile = (profile) => ({type: SET_PROFILE, profile});
const setStatus = (status) => ({type: SET_STATUS, status});
const setPhoto = (photos) => ({type: SET_PHOTO, photos});
const setIsFollowed = (followed) => ({type: SET_IS_FOLLOWED, followed});

export const getProfile = (userId) => async(dispatch) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setProfile(response.data));
}
export const getStatus = (userId) => async(dispatch) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async(dispatch) => {
    let response = await ProfileAPI.updateStatus(status);
    if(response.data.resultCode === 0){
        dispatch(setStatus(status))
    }
}
export const updatePhoto = (photo) => async(dispatch) => {
    let response = await ProfileAPI.updatePhoto(photo);
        if(response.data.resultCode === 0){
        dispatch(setPhoto(response.data.data.photos))
    }
}
export const updateProfile = (profile) => async(dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await ProfileAPI.updateProfile(profile);
        if(response.data.resultCode === 0){
        dispatch(getProfile(userId));
    }else{
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('contacts', {_error: message}));
        return Promise.reject(message)
    }
}
export const getFollow = (userId) => async(dispatch) => {
    let response = await ProfileAPI.getFollow(userId);
    dispatch(setIsFollowed(response.data));
}
