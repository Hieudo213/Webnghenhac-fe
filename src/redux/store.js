import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import albumReducer from "./slices/albumSlice";
import singleReducer from "./slices/singleSlice";
import genreReducer from "./slices/genreSlice";
import artistReducer from "./slices/artistSlice";
import userReducer from "./slices/userSlice";
import createArtistReducer from "./createComponent/CreateArtistSlice"
import createAlbumReducer from "./createComponent/CreateAlbumSlice"
import createSingleReducer from './createComponent/CreateSingleSlice'
import createPlaylistReducer from "./createComponent/CreatePlaylistSlice";
import createMusicReducer from "./createComponent/CreateMusicSlice";
import updateAlbumReducer from "./updateComponent/UpdateAlbumSlice";
import updateSingleReducer from "./updateComponent/UpdateSingleSlice";
import updatePlaylistReducer from "./updateComponent/UpdatePlaylistSlice";
import updateSongReducer from "./updateComponent/UpdateSongSlice";
import updateArtistReducer from "./updateComponent/UpdateArtistSlice";
import createCategoryReducer from "./createComponent/CreateCategorySlice";
import ActivateArtistReducer from "./activate/ActivateArtistSlice";
import ActivateAlbumReducer from "./activate/ActivateAlbumSlice";
import ActivatePlaylistReducer from "./activate/ActivatePlaylistSlice";
import ActivateSingleReducer from "./activate/ActivateSingleSlice";
import ActivateSongReducer from "./activate/ActivateSongSlice";
import UpdateCategoryReducer from "./updateComponent/UpdateCategorySlice";
import ArtistAReducer from "./updateArtistFor/ArtistASlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// export default configureStore({
//   reducer: {
//     auth: authReducer,
//     album: albumReducer,
//     single: singleReducer,
//     genre: genreReducer,
//     artist: artistReducer,
//   },
// });

const persistConfig = {
    key: 'root',
    version : 1,
    storage,
};
const rootReducer = combineReducers ({
    auth: authReducer,
    album: albumReducer,
    single: singleReducer,
    genre: genreReducer,
    artist: artistReducer,
    user : userReducer,
    createArtist : createArtistReducer,
    createAlbum : createAlbumReducer,
    createSingle : createSingleReducer,
    createPlaylist : createPlaylistReducer,
    createMusic : createMusicReducer,
    createCategory : createCategoryReducer,
    updateAlbum : updateAlbumReducer,
    updateSingle : updateSingleReducer,
    updatePlaylist : updatePlaylistReducer,
    updateSong : updateSongReducer,
    updateArtsit : updateArtistReducer,
    activateArtist : ActivateArtistReducer,
    activateAlbum : ActivateAlbumReducer,
    activatePlaylist : ActivatePlaylistReducer,
    activateSingle : ActivateSingleReducer,
    activateSong : ActivateSongReducer,
    updateCategory : UpdateCategoryReducer,
    updateSongArtist : ArtistAReducer, 
}) ;
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions:[FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER],
        },
    })
  });
  export const persistor = persistStore(store);
