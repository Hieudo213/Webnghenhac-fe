import { createSlice } from "@reduxjs/toolkit";

const activateArtistSlice = createSlice({
    name : "activateArtist",
    initialState : {
        artist : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
       activateArtistStart : (state) =>{
            state.artist.isFetching = true;
        },
       activateArtistSuccess : (state,action) =>{
            state.artist.Album = action.payload;
            state.artist.isFetching = false;
        },
       activateArtistFailed : (state) =>{
            state.artist.error = true
        },    
    }
})

export const {
    activateArtistFailed,
    activateArtistStart,
    activateArtistSuccess
} = activateArtistSlice.actions

export default activateArtistSlice.reducer;