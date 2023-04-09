import { createSlice } from "@reduxjs/toolkit";

const updateArtistSlice = createSlice({
    name : "updateArtist",
    initialState : {
        artist : {
            Artist : null,
            isFetching : false,
            error : false 
        },
       
    },
    reducers : {
        updateArtistStart : (state) =>{
            state.artist.isFetching = true;
        },
        updateArtistSuccess : (state,action) =>{
            state.artist.Artist = action.payload;
            state.artist.isFetching = false;
        },
        updateArtistFailed : (state) =>{
            state.artist.error = true
        },
    }
})

export const {
    updateArtistFailed,
    updateArtistSuccess,
    updateArtistStart,
} = updateArtistSlice.actions

export default updateArtistSlice.reducer;