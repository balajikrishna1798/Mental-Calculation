import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  playback: "",
  multiWindow: 2,
  isSpeaking:true
};

const TemporarySlice = createSlice({
  name: "temporary",
  initialState,
  reducers: {
    setPlayback: (state, action) => {
      state.playback = action.payload;
    },
    setMultiwindow: (state, action) => {
      state.multiWindow = action.payload;
    },
    setIsSpeaking: (state, action) => {
      state.isSpeaking = action.payload;
    },
  },
});

export const { setPlayback, setMultiwindow,setIsSpeaking } = TemporarySlice.actions;
export default TemporarySlice.reducer;
