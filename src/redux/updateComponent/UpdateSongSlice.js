import { createSlice } from "@reduxjs/toolkit";

const updateSongSlice = createSlice({
    name : "updateSong",
    initialState : {
        song : {
            Song : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updateSongStart : (state) =>{
            state.song.isFetching = true;
        },
        updateSongSuccess : (state,action) =>{
            state.song.Song = action.payload;
            state.song.isFetching = false;
        },
        updateSongFailed : (state) =>{
            state.song.error = true
        }
    }
})

export const {
    updateSongFailed,
    updateSongSuccess,
    updateSongStart
} = updateSongSlice.actions

export default updateSongSlice.reducer;