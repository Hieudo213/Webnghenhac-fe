import { React, useRef, useState, useEffect } from "react";
import "./SongPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../redux/apiRequest";
import axios from "axios";
function SongPage() {
  const [albumId, setAlbumId] = useState();
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [singleId, setSingleId] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState();
  const [musics, setMusics] = useState([]);
  const [musicId, setMusicId] = useState();
  const [title, setTitle] = useState("");
  const [length, setLength] = useState("");
  const titleRef = useRef(null);
  const lengthRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };
  const handleX = () => {
    titleRef.current.value = "";
    lengthRef.current.value = "";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/playlists/admin/all")
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/musics")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/albums/admin/all")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/singles/admin/all")
      .then((response) => {
        setSingles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Music = {
      title : title,
      length : length,
      albumId : albumId,
      singleId : singleId,
      playlistId : playlistId,
      musicId : musicId
    };

    createSong(Music,dispatch,navigate);
  }
  
  return (
    <div id="song-page-container">
      <div className="song-page-main">
        <form className="song-page-content" onSubmit={handleSubmit}>
          <div className="song-page-content-name">
            <label htmlFor="" className="song-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            <input
              ref={titleRef}
              type="text"
              className="song-page-content-name-input"
              placeholder="Nhập tên bài hát"
              onChange={handleTitle}
            />
          </div>

          <div className="song-page-content-description">
            <label htmlFor="" className="song-page-content-description-label">
              {" "}
              Length :{" "}
            </label>
            <input
              ref={lengthRef}
              type="text"
              className="song-page-content-description-input"
              placeholder="Nhập mô tả bài hát "
              onChange={handleLength}
            />
          </div>
          <div className="song-page-content-info">

            <div className="song-page-content-id">
              <label htmlFor="" className = "label-info"> Chọn Album : </label>
              <select
                className="album-select"
                name=""
                id=""
                onChange={(e) => {
                  setAlbumId(e.target.value);
                }}
              >
                {albums &&
                  albums.map((album) => (
                    <option
                      className="album-option"
                      key={album.id}
                      value={album.id}
                    >
                      {album.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="song-page-content-id">
              <label htmlFor="" className = "label-info"> Chọn single : </label>
              <select
                className="single-select"
                name=""
                id=""
                onChange={(e) => {
                  setSingleId(e.target.value);
                }}
              >
                {singles &&
                  singles.map((single) => (
                    <option key={single.id} value={single.id}>
                      {single.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="song-page-content-id">
              <label htmlFor="" className = "label-info"> Chọn playlist : </label>
              <select
                className="playlist-select"
                id=""
                onChange={(e) => {
                  setPlaylistId(e.target.value);
                }}
              >
                {playlists &&
                  playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="song-page-content-id">
              <label htmlFor="" className = "label-info"> Chọn bài hát : </label>
              <select className="music-select" id="" onChange={(e)=>{
                setMusicId(e.target.value)
              }}>
                {musics &&
                  musics.map((music) => (
                    <option key={music.id} value={music.id}>
                      {music.musicName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="song-page-content-">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>
              Nhập lại{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SongPage;
