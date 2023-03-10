import { configureStore } from '@reduxjs/toolkit';
import summarySlice from '../reducers/summarySlice'

export const store = configureStore({
    reducer: {
      summary: summarySlice,
    },
  })