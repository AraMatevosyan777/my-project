import *as axios from 'axios';

const instance = axios.create({
    baseURL: ('https://social-network.samuraijs.com/api/1.0/'),
    withCredentials: true,
    headers: {
        "API-KEY": "30000b76-71b0-4b3f-8e1a-d2b4657a07ad"
    }
})

export const ProfileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status})
    },
    updatePhoto(photo){
        let formData = new FormData();
        formData.append('image',photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile){
        return instance.put(`profile`, profile)
    },
    getFollow(userId){
        return instance.get(`/follow/${userId}`)
    },
}

export const UsersAPI = {
    getUsers(pageSize,page){
        return instance.get(`users?count=${pageSize}&page=${page}`)
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    },
}

export const AuthAPI = {
    me(){
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe,captcha){
        return instance.post(`auth/login`, {email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    },
}