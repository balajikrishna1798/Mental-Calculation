import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modeofoperation: "Addition",
    numberofdigitsfrom: 1,
    numberofdigitsto: 1,
    inputColors:[],
    numberofrows: 3,
    isMultiwindow: false,
    timeOutMs: 500,
    language: 'en-US',
    isHandsFree: false,
    mode: 1,
    numbers: [],
    multiNumbers: [[], [], []],
    result: 0,
    multiResults: [0, 0, 0],
};

const mentalSlice = createSlice({
    name: "mental",
    initialState,
    reducers: {
        setHandsFree: (state, action) => {
            state.isHandsFree = action.payload;
        },
        setInputColors: (state, action) => {
            state.inputColors = action.payload;
        },
        setMultiwindow: (state, action) => {
            state.mode = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setModeofOperation: (state, action) => {
            state.modeofoperation = action.payload;
        },
        setNumberofdigitsfrom: (state, action) => {
            state.numberofdigitsfrom = action.payload;
        },
        setNumberofdigitsto: (state, action) => {
            state.numberofdigitsto = action.payload;
        },
        setNumberofrows: (state, action) => {
            state.numberofrows = action.payload;
        },
        setIsMultiWindow: (state, action) => {
            state.isMultiwindow = action.payload;
        },
        setTimeOutMs: (state, action) => {
            state.timeOutMs = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setNumbers: (state, action) => {
            if (state.mode === 1) {
                state.numbers = action.payload;
            } else if (state.mode === 2 || state.mode === 3) {
                state.multiNumbers = action.payload;
            }
        },
        setResult: (state, action) => {
            if (state.mode === 1) {
                state.result = action.payload;
            } else if (state.mode === 2 || state.mode === 3) {
                state.multiResults = action.payload;
            }
        },
    },
});

export const {
    setMode, setMultiwindow, setResult, setHandsFree, setLanguage,
    setIsMultiWindow, setTimeOutMs, setNumbers, setNumberofdigitsto,
    setModeofOperation,setInputColors, setNumberofdigitsfrom, setNumberofrows
} = mentalSlice.actions;
export default mentalSlice.reducer;
