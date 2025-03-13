import { configureStore } from '@reduxjs/toolkit'
import calReducer from '../features/counter/calSlice.jsx'

export const CalStore = configureStore({
  reducer: {
    calculator: calReducer
  },
})