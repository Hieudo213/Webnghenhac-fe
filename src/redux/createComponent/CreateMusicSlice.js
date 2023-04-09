import { createSlice } from "@reduxjs/toolkit";

const createMusicSlice = createSlice({
    name : "createMusic",
    initialState : {
        music : {
            Music : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createMusicStart : (state) =>{
            state.music.isFetching = true;
        },
        createMusicSuccess : (state,action) =>{
            state.music.Music = action.payload;
            state.music.isFetching = false;
        },
        createMusicFailed : (state) =>{
            state.music.error = true
        }
    }
})

export const {
    createMusicFailed,
    createMusicSuccess,
    createMusicStart
} = createMusicSlice.actions

export default createMusicSlice.reducer;