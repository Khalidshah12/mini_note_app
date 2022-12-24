import * as types from './actionTypes'
const user = JSON.parse(localStorage.getItem('todouser')) || {}
const initialState = {
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
    token: user.token || '',
    username: user.username || '',
    isAuthLoading: false,
    isAuthError: false
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_USER_REQUEST: {
            return {
                ...state, isLoading: true,
            }
        }
        case types.GET_USER_SUCCESS: {
            localStorage.setItem('todouser', JSON.stringify({ username: payload.username, token: payload.token }))
            localStorage.setItem('isAuth', true)
            return {
                ...state, isLoading: false, token: payload.token, username: payload.username, isAuth: true
            }
        }
        case types.GET_USER_FAILURE: {
            localStorage.setItem('isAuth', false)
            return {
                ...state, isLoading: false, isError: true, token: '', isAuth: false, username: ''
            }
        }

        default: return state
    }
}