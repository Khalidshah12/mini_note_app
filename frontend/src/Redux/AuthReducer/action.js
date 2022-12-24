import * as types from './actionTypes'
import axios from 'axios'

export const getUserRequest = () => {
    return {
        type: types.GET_USER_REQUEST
    }
}

export const getUserSuccess = (payload) => {
    return {
        type: types.GET_USER_SUCCESS,
        payload
    }
}

export const getUserFailure = () => {
    return {
        type: types.GET_USER_FAILURE
    }
}

export const getUserLogin = (queryParams) => (dispatch) => {
    dispatch(getUserRequest())
    return axios.post('https://dead-jade-dalmatian-tie.cyclic.app/users/login', queryParams)
        .then((r) => {
            return dispatch(getUserSuccess({ token: r.data.token, username: r.data.username }))
        })
        .catch((e) => {
            console.log(e)
            dispatch(getUserFailure())
        })
}

export const logoutUser = (dispatch) => {
    
    dispatch(getUserFailure())
}