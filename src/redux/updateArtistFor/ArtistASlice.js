import { createSlice } from "@reduxjs/toolkit";

const updateArtistSongSlice = createSlice({
    name : "updateSong",
    initialState : {
        artist : {
            Song : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updateArtistForSongStart : (state) =>{
            state.artist.isFetching = true;
        },
        updateArtistForSongSuccess : (state,action) =>{
            state.artist.Song = action.payload;
            state.artist.isFetching = false;
        },
        updateArtistForSongFailed : (state) =>{
            state.artist.error = true
        },    
    }
})

export const {
    updateArtistForSongFailed,
    updateArtistForSongSuccess,
    updateArtistForSongStart,
} = updateArtistSongSlice.actions

export default updateArtistSongSlice.reducer;