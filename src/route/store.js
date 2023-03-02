import { configureStore, createSlice } from '@reduxjs/toolkit'
import app from './../App'

let user = createSlice({
    name: 'user',
    initialState: {name: 'kim', age: '20'},
    reducers: {
        changeName(state) {
            state.name = 'park'
        }
    }
})

export let {changeName} = user.actions

let cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        plusCount(state, action) {
            let checkId = state.findIndex((i)=> i.id === action.payload)
            ++state[checkId].count;
        },
        plusObject(state, action) {
            state.push(action.payload)
            let set = new Set(state)
            
        }
    }
})

export let {plusCount, plusObject} = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
})