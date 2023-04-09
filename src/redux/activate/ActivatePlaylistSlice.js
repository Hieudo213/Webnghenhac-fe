import { createSlice } from "@reduxjs/toolkit";

const activatePlaylistSlice = createSlice({
    name : "activatePlaylist",
    initialState : {
        playlist : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
       activatePlaylistStart : (state) =>{
            state.playlist.isFetching = true;
        },
       activatePlaylistSuccess : (state,action) =>{
            state.playlist.Album = action.payload;
            state.playlist.isFetching = false;
        },
       activatePlaylistFailed : (state) =>{
            state.playlist.error = true
        },    
    }
})

export const {
    activatePlaylistFailed,
    activatePlaylistStart,
    activatePlaylistSuccess
} = activatePlaylistSlice.actions

export default activatePlaylistSlice.reducer;