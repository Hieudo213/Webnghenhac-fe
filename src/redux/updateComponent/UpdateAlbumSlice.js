import { createSlice } from "@reduxjs/toolkit";

const updateAlbumSlice = createSlice({
    name : "updateAlbum",
    initialState : {
        album : {
            Album : null,
            isFetching : false,
            error : false 
        },
        artist : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updateAlbumStart : (state) =>{
            state.album.isFetching = true;
        },
        updateAlbumSuccess : (state,action) =>{
            state.album.Album = action.payload;
            state.album.isFetching = false;
        },
        updateAlbumFailed : (state) =>{
            state.album.error = true
        },

        
    }
})

export const {
    updateAlbumFailed,
    updateAlbumSuccess,
    updateAlbumStart,
} = updateAlbumSlice.actions

export default updateAlbumSlice.reducer;