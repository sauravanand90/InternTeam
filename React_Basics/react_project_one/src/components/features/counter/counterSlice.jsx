import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',                //This name is given to identify the slice
    initialState: {                 //initialState tells the initial value of the state
        value: 0
    },
    reducers: {                    //increment, decrement and incrementByAmount are actions(reducer functions)
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        reset: state => {
            state.value = 0
        },
        increaseBy: (state, action) => {
            state.value += Number(action.payload)
        },
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, increaseBy, reset} = counterSlice.actions
export default counterSlice.reducer