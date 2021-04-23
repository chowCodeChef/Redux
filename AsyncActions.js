const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fecthUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state, 
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state

    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware))

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fecthUsersRequest())
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then(response => {
                dispatch(fetchUsersSuccess(response.data.map(user => user.id)))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUsers())