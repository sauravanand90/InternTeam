import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    value: 0 // initial values 
  },// this counter's value is accessed by using useSelector hook

  reducers: {
    increment: (state) => { // if its an action then it has to be dispatched, using useDispatch hook
      state.value += 1 // actions increment decrement and increment by amount
    },
    reset: (state)=>{
        state.value=0
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += Number(action.payload) 
      //wrapping the payload along with action and sending it
    },// reducer takes and old state & an action and using those, changes into a new state 
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,reset } = counterSlice.actions

export default counterSlice.reducer
// restore this reducer in the store so that the store knows how handle the state and the actions associatd with it






  // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes