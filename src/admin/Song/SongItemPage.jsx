import { React, useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSong,activateSong,updateArtistForSongById } from "../../redux/apiRequest";
import "./SongItemPage.css";
import axios from "axios";
function SongItemPage() {
  const [artist,setArtist] = useState([]);
  const [artistId,setArtistId] = useState();
  const [change, setChange] = useState(false);
  const [song, setSong] = useState();
  let { id } = useParams();
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
  const handleChange = () => {
    if (change == false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Song = {
      title : title,
      length : length,
      albumId : albumId,
      singleId : singleId,
      playlistId : playlistId,
      musicId : musicId
    };

    updateSong(Song,dispatch,navigate,id);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/artists")
      .then((response) => {
        setArtist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/songs/${id}`)
      .then((response) => {
        setSong(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleActivate = (e)=>{
    e.preventDefault();
    activateSong(dispatch,navigate,id);
  }

  const handleArtist = (e)=>{
    e.preventDefault();
    const Song = {
      artists : [
        {
        id : artistId
        }
      ]
    };
    updateArtistForSongById(Song,dispatch,navigate,id);
  }


  return (
    <div id="song-item-page-container">
      <div className="single-item-page-main">
        {change ? (
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
        ) : (
          <form className="song-item-page-content">
           
          <div className="song-item-page-content-name">
            <label htmlFor="" className="song-item-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            {song && <span className="song-item-page-text">{song.title}</span>}
          </div>

          <div className="song-item-page-content-pob">
            <label htmlFor="" className="song-item-page-content-pob-label">
              {" "}
              Length :{" "}
            </label>
            {song && <span className="song-item-page-text">{song.length}</span>}
          </div>

          <div className="song-item-page-content-description">
            <label
              htmlFor=""
              className="song-item-page-content-description-label"
            >
              {" "}
              Album :{" "}
            </label>
            {song && (
              <span className="song-item-page-text">{song.album.title}</span>
            )}
          </div>

          <div className="song-item-page-content-dob">
            <label htmlFor="" className="song-item-page-content-dob-label">
              {" "}
              Single :{" "}
            </label>
            {song && (
              <span className="song-item-page-text">{song.single.title}</span>
            )}
          </div>

          <div className="song-item-page-content-pob">
            <label htmlFor="" className="song-item-page-content-pob-label">
              {" "}
              Playlist :{" "}
            </label>
            {song && (
              <span className="song-item-page-text">{song.playlist.title}</span>
            )}
          </div>

          <div className="song-item-page-content-pob">
            <label htmlFor="" className="song-item-page-content-pob-label">
              {" "}
              Music :{" "}
            </label>
            {song && (
              <span className="song-item-page-text">
                {song.music.musicName}
              </span>
            )}
          </div>

          
        </form>
        )}
        <div className="album-item-page-content-">
            {change ? (
              <button className="btn-agree-change" onClick={handleChange}>
                Huỷ{" "}
              </button>
            ) : (
              <button className="btn-agree-change" onClick={handleChange}>
                Chỉnh sửa{" "}
              </button>
            )}
          </div>
          {/* Artist */}

        <form action="" className="album-artist-create" onSubmit={handleArtist}>
        <div className="album-page-artist-id">
              <label htmlFor="" className = "label-info"> Chọn Artist : </label>
              <select className="music-select" id="" onChange={(e)=>{
                setArtistId(e.target.value)
              }}>
                {artist &&
                  artist.map((categories) => (
                    <option key={categories.id} value={categories.id}>
                      {categories.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className="album-page-artist-btn"> Thêm </button>
        </form>

          <form className ="activate-song" onSubmit={handleActivate} >
          <button className="activate-song" >Activate</button>
          </form>
      </div>
    </div>
  );
}

export default SongItemPage;
