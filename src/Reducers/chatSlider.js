import { createSlice } from '@reduxjs/toolkit'

export const chatbotSlider = createSlice({
 name: 'chatbot',
 initialState: {
   chatList:   [
   ]
 },
 reducers: {
   addChat: (state, action) => {
     let newChatList = {
       id: Math.random(),
       qustion: action.payload.qustion,
       content: action.payload.text
     }
     state.chatList.push(newChatList);
   },
   deleteChat: (state, action) => {
     let { chatList } = state;
     state.chatList = chatList.filter((item) => 
         item.id !== action.payload.id);
   },
   editChat: (state, action) => {
     let { chatList } = state;
     state.chatList = chatList.map((item) => 
       item.id === action.payload.id ? action.payload : item);
   }
  },
})
// Action creators are generated for each case reducer function
export const { addChat, deleteChat, editChat } = chatbotSlider.actions
export default chatbotSlider.reducer;