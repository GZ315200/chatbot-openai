

import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './Reducers/chatSlider';

export default configureStore({
  reducer: {
    chatbot: chatReducer
  }
})