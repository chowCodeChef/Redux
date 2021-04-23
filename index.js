const redux = require('redux')
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE' //action
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() { //action-creator
    return { // returns action
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'action creator to buy ice-creams'
    }
}

const initialCakeState = {  //state
    numOfCakes: 10
}

const initialIcecreamState = {
    numOfIceCreams: 20,
}

function cakeReducer(state = initialCakeState, action) {
    switch(action.type) {
        case BUY_CAKE: return {...state, numOfCakes: state.numOfCakes - 1}
        default: return state
    }
}

function iceCreamReducer(state = initialIcecreamState, action) {
    switch(action.type) {
        case BUY_ICECREAM: return {...state, numOfIceCreams: state.numOfIceCreams - 1}
        default: return state
    }
}

const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = redux.createStore(rootReducer, redux.applyMiddleware(logger))

console.log('Initial state ', store.getState())
const unsubscribe = store.subscribe(() => {
})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()