import { createSlice } from "@reduxjs/toolkit";

const createAlbumSlice = createSlice({
    name : "createAlbum",
    initialState : {
        album : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createAlbumStart : (state) =>{
            state.album.isFetching = true;
        },
        createAlbumSuccess : (state,action) =>{
            state.album.Album = action.payload;
            state.album.isFetching = false;
        },
        createAlbumFailed : (state) =>{
            state.album.error = true
        }
    }
})

export const {
    createAlbumFailed,
    createAlbumSuccess,
    createAlbumStart
} = createAlbumSlice.actions

export default createAlbumSlice.reducer;