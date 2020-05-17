import { AuthAPI } from "../api/api"
import { stopSubmit } from "redux-form";
const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
      case SET_AUTH_DATA:
          return{
              ...state,
              ...action.payload
          }
      case SET_CAPTCHA:
          return{
              ...state,
              captchaUrl: action.captcha
          }
        default:
            return state
    };
}

const setAuthData = (id,email,login,isAuth,captcha) => ({type: SET_AUTH_DATA, payload:{id,email,login,isAuth,captcha}});
const setCaptcha= (captcha) => ({type: SET_CAPTCHA, captcha});

export const getAuthMe = () => async(dispatch) => {
    let response = await AuthAPI.me();
    if(response.data.resultCode === 0){
        let {id,email,login} = response.data.data;
        dispatch(setAuthData(id,email,login,true, null))
    }
}
export const login = (email,password,rememberMe,captcha) => async(dispatch) => {
    let response = await AuthAPI.login(email,password,rememberMe,captcha);
    if(response.data.resultCode === 0){
        dispatch(getAuthMe())
    }else{
        if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}));
    }
}
export const getCaptchaUrl = () => async(dispatch) => {
    let response = await AuthAPI.getCaptcha();
        dispatch(setCaptcha(response.data.url));
}
export const logout = () => async (dispatch) => {
    let response = await AuthAPI.logout();
    if(response.data.resultCode === 0){
        dispatch(setAuthData(null,null,null,false,null));
    }
}
