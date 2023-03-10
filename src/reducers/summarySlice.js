import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    incomeSummary: 0,
    outcomeSummary: 0,
    summary: 0
  }

  export const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
      getIncomeSummary: (state, action) => {
        state.incomeSummary = action.payload
      },
      getOutcomeSummary: (state, action) => {
        state.outcomeSummary = action.payload
      },
      getSummary: (state, action) => {
        state.summary = action.payload
      },
    },
  })
  
  export const { getIncomeSummary, getOutcomeSummary, getSummary } = summarySlice.actions

export default summarySlice.reducer