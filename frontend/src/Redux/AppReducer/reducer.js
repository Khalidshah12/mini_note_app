import * as types from './actionTypes'

const initialState = {
    todos: [],
    isLoading: false,
    isError: false
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_TODOS_REQUEST: {
            return {
                ...state, isLoading: true,
            }
        }
        case types.GET_TODOS_SUCCESS: {
            return {
                ...state, isLoading: false, isError: false, todos: payload
            }
        }
        case types.GET_TODOS_FAILURE: {
            return {
                ...state, isLoading: false, isError: true, todos: []
            }
        }
        default: return state
    }
}