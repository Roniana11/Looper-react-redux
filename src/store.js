import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  isStop: false,
  loop:false,
  currentTime:0,
  position:0,
};
const audioSlice = createSlice({ 
  name: 'audio',
  initialState: initialState,
  reducers:{
    setIsPlaying(state,payload){
      const isPlaying = payload.payload.isPlaying;
      state.isPlaying = isPlaying;
      state.isStop = false;
    },
    setCurrentTime(state,payload){
      const time = payload.payload.currentTime;
      const position = payload.payload.position;
      state.currentTime = time;
      state.position = position;
    },
    setIsStop(state,payload){
      state.isStop = true;
      state.isPlaying = false;
    },
    setLoop(state,payload){
      state.loop = !state.loop;
    },
    
  }
 });

 export const audioActions = audioSlice.actions;

 const store = configureStore({
   reducer: audioSlice.reducer
 })

 export default store;