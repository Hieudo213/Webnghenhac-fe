import { React, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./ArtistItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { MusicContext } from "../../context/MusicContext";
import { getArtistById } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
function ArtistItem() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const artists = useSelector((state) => state.artist.artist?.Artist);
  const {
    isPlay,
    setPlay,
    curSong,
    setCurSong,
    source,
    setSource,
    audioRef,
    handlePausePlayClick,
  } = useContext(MusicContext);
  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay]);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [curSong]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.token) {
      getArtistById(user?.token, dispatch, id);
    }
  }, []);
  return (
    <div id="artist-container">
      {artists && (
        <div className="artist-content-main">
          {/* Header */}
          <div className="artist-header">
            <div className="artist-header_avatar">
              <div className="artist-header_avatar-img">
                <img
                  className="artist-img-content"
                  src={
                    "http://localhost:8080/api/v1/public/pictures/file/" +
                    artists.picture.id
                  }
                />
              </div>
            </div>
            <div className="artist-header_Play">
              <span className="artist-header_icon">
                <div className="artist-header_icon_content"></div>
              </span>
              <span className="artist-header_name">{artists.name}</span>
            </div>
          </div>
          {/* Body */}
          <div className="artist-body">
            {/* Lastest Release */}
            <div className="artist-body_title">
              <h3 className="artist-body_title-1"> Lastest Release </h3>
              <h3 className="artist-body_title-2"> Top Songs</h3>
              <Link to={`/song/artist/${artists.id}`} className="artist-body_title-3"><span>Tất cả các bài hát của {artists.name}</span> </Link>
            </div>

            <div className="lastest-release">
              {artists.albums.map((album) => (
                <Link
                  to={`/album/${album.id}`}
                  className="lastest-release-album"
                  key={album.id}
                >
                  <div className="lastest-release-album-img">
                    <img
                      className="album-img-content"
                      src={
                        "http://localhost:8080/api/v1/public/pictures/file/" +
                        album.picture.id
                      }
                    />
                  </div>

                  <div className="lastest-release-album-content">
                    <div className="lastest-release-album-content_date">
                      {album.releaseYear}
                    </div>
                    <div className="lastest-release-album-content_name">
                      {album.title}
                    </div>
                    <div className="lastest-release-album-content_count">
                      {album.length} Songs
                    </div>
                    <div className="lastest-release-album-content_add">
                      <span className="lastest-release-album-content_add-text">
                        + Add
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Song */}
              <div className="lastest-release-song">
                {artists.songs.map((song) => (
                  <div className="lastest-release-song-main" key={song.id}>
                    <div
                      className="lastest-release-song-avatar"
                      onClick={() => handlePausePlayClick(song)}
                    >
                      <img
                        className="song-img-content"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          song.single.picture.id
                        }
                      />
                      <div className="play-icon-content">
                        <FontAwesomeIcon
                          size="lg"
                          icon={
                            isPlay === true && curSong.id === song.id
                              ? faPause
                              : faPlay
                          }
                        />
                      </div>
                    </div>
                    <div className="lastest-release-song-content">
                      <div className="lastest-release-song-content-texts">
                        <div className="lastest-release-song-content-title">
                          {song.title}
                        </div>
                        <div className="lastest-release-song-content-info">
                          <span className="lastest-release-song-content-info-album">
                            {song.album.title}
                          </span>
                          <span className="lastest-release-song-content-info-year">
                            {song.single.releaseYear}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Albums */}
            <div className="albums-body_title">
              <h3 className="albums-body_title-1"> Albums </h3>
            </div>
            <div className="albums-content">
              {artists.albums.map((album) => (
                <Link
                  className="albums-content-main"
                  key={album.id}
                  to={`/album/${album.id}`}
                >
                  <div className="albums-content-avatar">
                    <div className="albums-content-img">
                      <img
                        className="album-img-content"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          album.picture.id
                        }
                      />
                    </div>
                  </div>
                  <div className="albums-content-name">
                    <div className="albums-content-name-text">
                      {album.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistItem;
