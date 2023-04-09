import { createSlice } from "@reduxjs/toolkit";

const activateSongSlice = createSlice({
    name : "activateSong",
    initialState : {
        song : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
       activateSongStart : (state) =>{
            state.song.isFetching = true;
        },
       activateSongSuccess : (state,action) =>{
            state.song.Album = action.payload;
            state.song.isFetching = false;
        },
       activateSongFailed : (state) =>{
            state.song.error = true;
        },    
    }
})

export const {
    activateSongFailed,
    activateSongStart,
    activateSongSuccess
} = activateSongSlice.actions

export default activateSongSlice.reducer;