import * as types from './actionTypes'
import axios from 'axios'

export const getTodosRequest = () => {
    return {
        type: types.GET_TODOS_REQUEST
    }
}

export const getTodosSuccess = (payload) => {
    return {
        type: types.GET_TODOS_SUCCESS,
        payload
    }
}

export const getTodosFailure = () => {
    return {
        type: types.GET_TODOS_FAILURE
    }
}

export const getTodos = (token) => (dispatch) => {
    dispatch(getTodosRequest())
    axios.get('https://dead-jade-dalmatian-tie.cyclic.app/todos', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((r) => {
            dispatch(getTodosSuccess(r.data))
        })
        .catch((e) => {
            dispatch(getTodosFailure())
        })
}

