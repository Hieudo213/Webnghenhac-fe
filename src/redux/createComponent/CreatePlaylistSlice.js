import { createSlice } from "@reduxjs/toolkit";

const createPlaylistSlice = createSlice({
    name : "createPlaylist",
    initialState : {
        playlist : {
            Playlist : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createPlaylistStart : (state) =>{
            state.playlist.isFetching = true;
        },
        createPlaylistSuccess : (state,action) =>{
            state.playlist.Playlist = action.payload;
            state.playlist.isFetching = false;
        },
        createPlaylistFailed : (state) =>{
            state.playlist.error = true
        }
    }
})

export const {
    createPlaylistFailed,
    createPlaylistSuccess,
    createPlaylistStart
} = createPlaylistSlice.actions

export default createPlaylistSlice.reducer;