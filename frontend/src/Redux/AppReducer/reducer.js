import * as types from './actionTypes'

const initialState = {
    notes: [],
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
                ...state, isLoading: false, isError: false, notes: payload
            }
        }
        case types.GET_TODOS_FAILURE: {
            return {
                ...state, isLoading: false, isError: true, notes: []
            }
        }
        default: return state
    }
}