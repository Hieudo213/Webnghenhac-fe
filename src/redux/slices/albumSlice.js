import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name : "album",
    initialState:{
        album:{
            Album:null,
            isFetching : false,
            error:false
        },
    },
    reducers:{
        getAlbumStart: (state)=>{
            state.album.isFetching=true;
        },
        getAlbumSuccess: (state,action) =>{
            state.album.isFetching=false;
            state.album.Album = action.payload;
        },  
        getAlbumFailed: (state)=>{
            state.album.isFetching=false;
            state.album.error=true;
        }
    }
})

export const {
    getAlbumFailed,
    getAlbumStart,
    getAlbumSuccess
} = albumSlice.actions;

export default albumSlice.reducer;