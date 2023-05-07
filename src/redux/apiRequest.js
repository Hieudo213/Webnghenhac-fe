import axios from "axios";
import { persistStore } from "redux-persist";
import { store } from "./store";
import {
  createCategoryFailed,
  createCategoryStart,
  createCategorySuccess
} from "./createComponent/CreateCategorySlice"
import {
  createMusicFailed,
  createMusicStart,
  createMusicSuccess
} from "./createComponent/CreateMusicSlice"
import {
updateArtistFailed,
updateArtistStart,
updateArtistSuccess,
} from "./updateComponent/UpdateArtistSlice"
import {
  updateSongFailed,
  updateSongStart,
  updateSongSuccess
} from "./updateComponent/UpdateSongSlice"
import {
  updatePlaylistFailed,
  updatePlaylistStart,
  updatePlaylistSuccess
} from "./updateComponent/UpdatePlaylistSlice"
import {
  updateSingleFailed,
  updateSingleStart,
  updateSingleSuccess
} from "./updateComponent/UpdateSingleSlice"
import {
  createArtistFailed,
  createArtistSuccess,
  createArtistStart,
} from "./createComponent/CreateArtistSlice";
import {
  createPlaylistFailed,
  createPlaylistSuccess,
  createPlaylistStart
} from "./createComponent/CreatePlaylistSlice"
import {
  createAlbumFailed,
  createAlbumSuccess,
  createAlbumStart,
} from "./createComponent/CreateAlbumSlice";
import {
  createSingleFailed,
  createSingleSuccess,
  createSingleStart,
} from "./createComponent/CreateSingleSlice";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  RegisterFailed,
  RegisterSuccess,
  RegisterStart,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "./slices/authSlice";
import {
  getAlbumFailed,
  getAlbumSuccess,
  getAlbumStart,
} from "./slices/albumSlice";
import {
  getSingleFailed,
  getSingleSuccess,
  getSingleStart,
  ResetSingleFailed,
  ResetSingleSuccess,
  ResetSingleStart,
  getSinglesFailed,
  getSinglesStart,
  getSinglesSuccess,
} from "./slices/singleSlice";
import {
  getGenreFailed,
  getGenreStart,
  getGenreSuccess,
} from "./slices/genreSlice";
import {
  getArtistFailed,
  getArtistStart,
  getArtistSuccess,
} from "./slices/artistSlice";
import {
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "./slices/userSlice";
import {
  updateAlbumFailed,
  updateAlbumStart,
  updateAlbumSuccess,
} from "./updateComponent/UpdateAlbumSlice"

import {
  updateArtistForAlbumFailed,
  updateArtistForAlbumStart,
  updateArtistForAlbumSuccess
} from "./updateArtistFor/AlbumASlice"

import {
  activateArtistFailed,
  activateArtistStart,
  activateArtistSuccess
} from "./activate/ActivateArtistSlice"

import {
  activateAlbumFailed,
  activateAlbumStart,
  activateAlbumSuccess
} from "./activate/ActivateAlbumSlice"

import {
activatePlaylistFailed,
activatePlaylistStart,
activatePlaylistSuccess
} from "./activate/ActivatePlaylistSlice"

import {
activateSingleFailed,
activateSingleStart,
activateSingleSuccess
} from "./activate/ActivateSingleSlice"

import {
activateSongFailed,
activateSongStart,
activateSongSuccess
} from "./activate/ActivateSongSlice"

import {
updateCategoryFailed,
updateCategoryStart,
updateCategorySuccess
} from "./updateComponent/UpdateCategorySlice"

import {
updateArtistForSongFailed,
updateArtistForSongStart,
updateArtistForSongSuccess
} from "./updateArtistFor/ArtistASlice"

import{
  updateRoleFailed,
  updateRoleStart,
  updateRoleSuccess
} from "./user/UpdateRoleSlice"

import{
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess
} from "./user/DeleteUserSlice"
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/authenticate",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/listennow");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(RegisterStart());
  try {
    await axios.post("http://localhost:8080/api/v1/auth/register", user);
    dispatch(RegisterSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(RegisterFailed());
  }
};

export const getAlbumById = async (accessToken, dispatch, id) => {
  dispatch(getAlbumStart());
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/public/albums/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAlbumSuccess(res.data));
  } catch (err) {
    dispatch(getAlbumFailed());
  }
};

export const getSingleById = async (accessToken, dispatch, id) => {
  dispatch(getSingleStart());
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/public/singles/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getSingleSuccess(res.data));
  } catch (err) {
    dispatch(getSingleFailed());
  }
};

export const getGenreById = async (accessToken, dispatch, id) => {
  dispatch(getGenreStart());
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/public/categories/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getGenreSuccess(res.data));
  } catch (err) {
    dispatch(getGenreFailed());
  }
};

export const getArtistById = async (accessToken, dispatch, id) => {
  dispatch(getArtistStart());
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/public/artists/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getArtistSuccess(res.data));
  } catch (err) {
    dispatch(getArtistFailed());
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    persistStore(store).purge();
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export const ResetSingle = async (dispatch) => {
  dispatch(ResetSingleStart());
  try {
    dispatch(ResetSingleSuccess());
  } catch (err) {
    dispatch(ResetSingleFailed());
  }
};

export const updateUserById = async (user, dispatch, id, navigate) => {
  dispatch(updateUserStart());
  try {
    await axios.put(
      `http://localhost:8080/api/v1/public/users/update/${id}`,
      user
    );
    dispatch(updateUserSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

export const getAllSingles = async (dispatch) => {
  dispatch(getSinglesStart());
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/public/singles`);
    dispatch(getSinglesSuccess(res.data));
  } catch (err) {
    dispatch(getSinglesFailed());
  }
};

export const createCategory = async (Category, dispatch, navigate) => {
  dispatch(createCategoryStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/categories/create`,
      Category
    );
    dispatch(createCategorySuccess(res.data));
    navigate("/admin/update/Category");
  } catch (err) {
    dispatch(createCategoryFailed());
  }
};

export const updateCategory = async (Category, dispatch, navigate,id) => {
  dispatch(updateCategoryStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/categories/update/${id}`,
      Category
    );
    dispatch(updateCategorySuccess(res.data));
    navigate("/admin/update/Category");
  } catch (err) {
    dispatch(updateCategoryFailed());
  }
};

export const createArtist = async (Artist, dispatch, navigate) => {
  dispatch(createArtistStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/artists/create`,
      Artist
    );
    dispatch(createArtistSuccess(res.data));
    navigate("/admin/update/artist");
  } catch (err) {
    dispatch(createArtistFailed());
  }
};

export const updateArtist = async (Artist, dispatch, navigate,id) => {
  dispatch(updateArtistStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/artists/update/${id}`,
      Artist
    );
    dispatch(updateArtistSuccess(res.data));
    navigate("/admin/update/artist");
  } catch (err) {
    dispatch(updateArtistFailed());
  }
};


export const activateArtist = async (dispatch, navigate,id) => {
  dispatch(activateArtistStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/artists/admin/activate/${id}`
     
    );
    dispatch(activateArtistSuccess(res.data));
    navigate("/admin/update/artist");
  } catch (err) {
    dispatch(activateArtistFailed());
  }
};



export const createAlbum = async (Album, dispatch, navigate) => {
  dispatch(createAlbumStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/albums/create`,
      Album
    );
    dispatch(createAlbumSuccess(res.data));
    navigate("/admin/update/album");
  } catch (err) {
    dispatch(createAlbumFailed());
  }
};

export const updateAlbumById = async (Album, dispatch, navigate,id) => {
  dispatch(updateAlbumStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/albums/update/${id}`,
      Album
    );
    dispatch(updateAlbumSuccess(res.data));
    navigate("/admin/update/album");
  } catch (err) {
    dispatch(updateAlbumFailed());
  }
};

export const updateArtistForAlbumById = async (Album, dispatch, navigate,id) => {
  dispatch(updateArtistForAlbumStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/albums/update/artist/${id}`,
      Album
    );
    dispatch(updateArtistForAlbumSuccess(res.data));
    navigate("/admin/update/album");
  } catch (err) {
    dispatch(updateArtistForAlbumFailed());
  }
};

export const activateAlbum = async (dispatch, navigate,id) => {
  dispatch(activateAlbumStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/albums/admin/activate/${id}`
    );
    dispatch(activateAlbumSuccess(res.data));
    navigate("/admin/update/album");
  } catch (err) {
    dispatch(activateAlbumFailed());
  }
};


export const createSingle = async (Single, dispatch, navigate) => {
  dispatch(createSingleStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/singles/create`,
      Single
    );
    dispatch(createSingleSuccess(res.data));
    navigate("/admin/update/single");
  } catch (err) {
    dispatch(createSingleFailed());
  }
};

export const updateSingle = async (Single, dispatch, navigate,id) => {
  dispatch(updateSingleStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/singles/update/${id}`,
      Single
    );
    dispatch(updateSingleSuccess(res.data));
    navigate("/admin/update/single");
  } catch (err) {
    dispatch(updateSingleFailed());
  }
};

export const activateSingle = async (dispatch, navigate,id) => {
  dispatch(activateSingleStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/singles/admin/activate/${id}`
    );
    dispatch(activateSingleSuccess(res.data));
    navigate("/admin/update/Single");
  } catch (err) {
    dispatch(activateSingleFailed());
  }
};

export const createPlaylist = async (Playlist, dispatch, navigate) => {
  dispatch(createPlaylistStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/playlists/create`,
      Playlist
    );
    dispatch(createPlaylistSuccess(res.data));
    navigate("/admin/update/playlist");
  } catch (err) {
    dispatch(createPlaylistFailed());
  }
};

export const updatePlaylist = async (Playlist, dispatch, navigate,id) => {
  dispatch(updatePlaylistStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/playlists/update/${id}`,
      Playlist
    );
    dispatch(updatePlaylistSuccess(res.data));
    navigate("/admin/update/playlist");
  } catch (err) {
    dispatch(updatePlaylistFailed());
  }
};

export const activatePlaylist = async (dispatch, navigate,id) => {
  dispatch(activatePlaylistStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/playlists/admin/activate/${id}`
    );
    dispatch(activatePlaylistSuccess(res.data));
    navigate("/admin/update/playlist");
  } catch (err) {
    dispatch(activatePlaylistFailed());
  }
};

export const createSong = async (Music, dispatch, navigate) => {
  dispatch(createMusicStart());
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/public/songs/create`,
      Music
    );
    dispatch(createMusicSuccess(res.data));
    navigate("/admin/update/song");
  } catch (err) {
    dispatch(createMusicFailed());
  }
};

export const updateSong = async (Song, dispatch, navigate,id) => {
  dispatch(updateSongStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/songs/update/${id}`,
      Song
    );
    dispatch(updateSongSuccess(res.data));
    navigate("/admin/update/song");
  } catch (err) {
    dispatch(updateSongFailed());
  }
};

export const activateSong = async (dispatch, navigate,id) => {
  dispatch(activateSongStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/songs/admin/activate/${id}`
    );
    dispatch(activateSongSuccess(res.data));
    navigate("/admin/update/song");
  } catch (err) {
    dispatch(activateSongFailed());
  }
};

export const updateArtistForSongById = async (Song, dispatch, navigate,id) => {
  dispatch(updateArtistForSongStart());
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/songs/update/artist/${id}`,
      Song
    );
    dispatch(updateArtistForSongSuccess(res.data));
    navigate("/admin/update/song");
  } catch (err) {
    dispatch(updateArtistForSongFailed());
  }
};

export const deletedUserById = async(dispatch,navigate,id) =>{
  dispatch(deleteUserStart());
  try{  
    const res = await axios.delete(
      `http://localhost:8080/api/v1/public/users/delete/${id}`
    );
    dispatch(deleteUserSuccess(res.data))
    navigate("/admin/user-list");
  }catch(err){
    dispatch(deleteUserFailed());
  }
}

export const updateRoleById = async(role,dispatch,navigate,id) =>{
  dispatch(updateRoleStart());
  try{  
    const res = await axios.put(
      `http://localhost:8080/api/v1/public/users/admin/update/role/${id}?Role=${role}`
    );
    dispatch(updateRoleSuccess(res.data))
    navigate("/admin/user-list");
  }catch(err){
    dispatch(updateRoleFailed());
  }
}



