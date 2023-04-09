import { createSlice } from "@reduxjs/toolkit";

const activateAlbumSlice = createSlice({
    name : "activateAlbum",
    initialState : {
        album : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
       activateAlbumStart : (state) =>{
            state.album.isFetching = true;
        },
       activateAlbumSuccess : (state,action) =>{
            state.album.Album = action.payload;
            state.album.isFetching = false;
        },
       activateAlbumFailed : (state) =>{
            state.album.error = true
        },    
    }
})

export const {
    activateAlbumFailed,
    activateAlbumStart,
    activateAlbumSuccess
} = activateAlbumSlice.actions

export default activateAlbumSlice.reducer;