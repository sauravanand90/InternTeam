import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const calSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        add: (state, action) => {
            const number1 = Number(action.payload.value1);
            const number2 = Number(action.payload.value2);
            state.value = number1 + number2;
            console.log("Payload", number1, number2)
            // state.value = Number(action.payload.value1) + Number(action.payload.value2);
        },
        sub: (state, action) => {
            state.value = Number(action.payload.value1) - Number(action.payload.value2);
        },
        mul: (state, action) => {
            state.value = Number(action.payload.value1) * Number(action.payload.value2);
        },
        div: (state, action) => {
            state.value = Number(action.payload.value2) !== 0 ? Number(action.payload.value1) / Number(action.payload.value2) : 'Error';
        },
        reset: (state) => {
            state.value=0;
        },
    },
})

export const { add, sub, mul, div, reset } = calSlice.actions
export default calSlice.reducer