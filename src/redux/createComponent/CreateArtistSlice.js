import { createSlice } from "@reduxjs/toolkit";

const createArtistSlice = createSlice({
    name : "createArtist",
    initialState : {
        artist : {
            Artist : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createArtistStart : (state) =>{
            state.artist.isFetching = true;
        },
        createArtistSuccess : (state,action) =>{
            state.artist.Artist = action.payload;
            state.artist.isFetching = false;
        },
        createArtistFailed : (state) =>{
            state.artist.error = true
        }
    }
})

export const {
    createArtistFailed,
    createArtistSuccess,
    createArtistStart
} = createArtistSlice.actions

export default createArtistSlice.reducer;