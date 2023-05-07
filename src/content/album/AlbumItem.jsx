import React, { useEffect, useState, useRef, useContext } from "react";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAlbumById } from "../../redux/apiRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import "./album.css";
import { MusicContext } from "../../context/MusicContext";
export const AlbumItem = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const album = useSelector((state) => state.album.album?.Album);
  const { isPlay, setPlay, curSong, setCurSong, source, setSource, audioRef, handlePausePlayClick, song } = useContext(MusicContext)
  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlay])

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlay) {
        audioRef.current.play()

      } else {
        audioRef.current.pause()
      }
    }
  }, [curSong])



  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.token) {

      getAlbumById(user?.token, dispatch, id)
    }
  }, []);

  return (
    <div id="container">
      {album && (
        <div>
          <div className="album-detail">
            <div className="album-img">
              <img
                className="album-img-content"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  album.picture.id
                }
              />
            </div>
            <div className="album-content">
              <div className="album-title">
                {album.title}
              </div>
              <div className="album-publish">
                {album.publisher}
              </div>
              <div className="album-description">
                <div className="album-description-text">
                  {album.description}
                </div>
              </div>
              <div className="btn">
                <div className="btn-1">
                  <div className="btn-text">Play</div>
                </div>
                <div className="btn-2">
                  <div className="btn-text">Shuffle</div>
                </div>
              </div>
            </div>
          </div>

          <div className="song-detail">
            <div className="song-detail-container">
              <div className="song-detail-title">
                <div className="song-detail-column-1">
                  <div className="title-text">Song</div>
                </div>
                <div className="song-detail-column-2">
                  <div className="title-text">Artist</div>
                </div>
                <div className="song-detail-column-3">
                  <div className="title-text">Album</div>
                </div>
                <div className="song-detail-column-4">
                  <div className="title-text">Thời lương</div>
                </div>
              </div>
              <div className="song-detail-content">
                {album.songs.map((song) => (
                  <div style={
                    song.id % 2 === 0 ? { backgroundColor: "#fff" } : { backgroundColor: "#fbfbfb" }
                  } className='song-content-main' key={song.id}>
                    <div className='song-content-avatar'>
                      <div className='song-content-img' onClick={() => handlePausePlayClick(song)}>
                        <img className="album-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + song.single.picture.id} />
                        <div className="play-icon">
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
                    </div>

                    <div className='song-content-title'>
                      <div className='song-content-title-text'>
                        {song.title}
                      </div>
                    </div>

                    <div className='song-content-artist'>
                      {song.artists.map(artist => (
                        <div className='song-content-artist-text'>
                          {artist.name}
                        </div>
                      ))}

                    </div>

                    <div className='song-content-album'>
                      <div className='song-content-album-text'>
                        {album.title}
                      </div>
                    </div>

                    <div className='song-content-length'>
                      <div className='song-content-length-text'>
                        {song.length}
                      </div>
                    </div>

                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumItem;
