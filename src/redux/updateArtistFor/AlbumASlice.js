import { createSlice } from "@reduxjs/toolkit";

const updateArtistAlbumSlice = createSlice({
    name : "updateAlbum",
    initialState : {
        artist : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updateArtistForAlbumStart : (state) =>{
            state.artist.isFetching = true;
        },
        updateArtistForAlbumSuccess : (state,action) =>{
            state.artist.Album = action.payload;
            state.artist.isFetching = false;
        },
        updateArtistForAlbumFailed : (state) =>{
            state.artist.error = true
        },    
    }
})

export const {
    updateArtistForAlbumFailed,
    updateArtistForAlbumSuccess,
    updateArtistForAlbumStart,
} = updateArtistAlbumSlice.actions

export default updateArtistAlbumSlice.reducer;