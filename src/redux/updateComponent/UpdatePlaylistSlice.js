import { createSlice } from "@reduxjs/toolkit";

const updatePlaylistSlice = createSlice({
    name : "updatePlaylist",
    initialState : {
        playlist : {
            Playlist : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updatePlaylistStart : (state) =>{
            state.playlist.isFetching = true;
        },
        updatePlaylistSuccess : (state,action) =>{
            state.playlist.Playlist = action.payload;
            state.playlist.isFetching = false;
        },
        updatePlaylistFailed : (state) =>{
            state.playlist.error = true
        }
    }
})

export const {
    updatePlaylistFailed,
    updatePlaylistSuccess,
    updatePlaylistStart
} = updatePlaylistSlice.actions

export default updatePlaylistSlice.reducer;