import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
   modeofoperation:"Multiplication",
   numberofdigitsfrom:1,
   numberofdigitsto:1,
   numberofrows:3,
   isMultiwindow:false,
   timeOutMs:500,
   language:'en-US',
   isHandsFree:false
}

const MentalSlice = createSlice({

    name: "mental",
    initialState,
    reducers: {
        setHandsFree : (state, action) => {
            state.isHandsFree = action.payload;
        },
        setLanguage : (state, action) => {
            state.language = action.payload;
        },
        setNumbers : (state, action) => {
            return {...state,numbers:action.payload}
        },
        setModeofOperation : (state, action) => {
            state.modeofoperation = action.payload;
        },
        setNumberofdigitsfrom : (state, action) => {
            state.numberofdigitsfrom = action.payload;
        },
        setNumberofdigitsto : (state, action) => {
            state.numberofdigitsto = action.payload;
        },
        setNumberofrows : (state, action) => {
            state.numberofrows = action.payload;
        },
        setIsMultiWindow : (state, action) => {
            state.isMultiwindow = action.payload;
        },
        setTimeOutMs : (state, action) => {
            state.timeOutMs = action.payload;
        },
    },

});

export const { setHandsFree,setLanguage,setIsMultiWindow,setTimeOutMs,setNumbers,setNumberofdigitsto,setModeofOperation,setNumberofdigitsfrom,setNumberofrows } = MentalSlice.actions
export default MentalSlice.reducer;
