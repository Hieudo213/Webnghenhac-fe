import { React, useContext, useState, useEffect, useRef } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser, ResetSingle } from "../../redux/apiRequest";
import {
  faPause,
  faPlay,
  faForward,
  faBackward,
  faShuffle,
  faInfinity,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { MusicContext } from "../../context/MusicContext";
import axios from "axios";
import { getSingleById } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState();
  const header = useSelector((state) => state.single.single?.Single);
  const handleLogout = () => {
    logoutUser(dispatch, navigate);
    ResetSingle(dispatch);
  };
  const {
    isPlay,
    audioRef,
    source,
    setSource,
    curSong,
    song,
    handlePausePlayClick,
    user,
    handlePrev,
    handleVolume,
    handleNext,
    setPlay,
    setSong,
    setCurSong,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    progressBar,
    songId
  } = useContext(MusicContext);

  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    if (progressBar.current) {
      progressBar.current.max = seconds;
    }
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  const caculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes} : ${returnedSeconds}`;
  };

  const changeRange = () => {
    audioRef.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.token) {
      getSingleById(user?.token, dispatch, songId);
    }
  }, [songId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/users/${user.id}`)
      .then((response) => {
        setNickname(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [source]);

  useEffect(() => {
    setSong(header);
    setCurSong(header);
  }, [header]);

  
  return (
    <div id="header">
      <div className="header-icon">
        <FontAwesomeIcon
          className="header-icon-content mini"
          icon={faShuffle}
        />

        <FontAwesomeIcon
          className="header-icon-content"
          icon={faBackward}
          onClick={handlePrev}
        />

        <FontAwesomeIcon
          className="header-icon-content"
          icon={isPlay === true && curSong.id === song.id ? faPause : faPlay}
          onClick={() => handlePausePlayClick(curSong)}
        />

        <FontAwesomeIcon
          className="header-icon-content"
          icon={faForward}
          onClick={handleNext}
        />

        <FontAwesomeIcon
          className="header-icon-content mini"
          icon={faInfinity}
        />
      </div>
      <div className="header-song">
        {user && header ? (
          <div className="header-song-main">
            <div className="header-song-avatar">
              <img
                className="header-img-content"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  header.picture.id
                }
              />
            </div>
            <div className="header-song-content">
              <div className="header-song-content-title">{header.title}</div>
              <div className="header-song-content-artist-album">
                {header.songs.map((song) =>
                  song.artists.map((artist) => artist.name)
                )}{" "}
                -- {header.songs.map((song) => song.album.title)}
              </div>
              <div className="header-song-time">
                <div className="header-song-duration-currentTime">
                  {caculateTime(currentTime)}
                </div>
                <div className="header-song-duration-time">
                  {duration && !isNaN(duration) && caculateTime(duration)}
                </div>
              </div>
              <div className="header-song-duration">
                <input
                  type="range"
                  className="header-song-duration-range"
                  defaultValue="0"
                  ref={progressBar}
                  onChange={changeRange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="header-song-main">
            <div className="header-song-avatar">
              <img
                className="header-img-content"
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/330157622_427289222908107_7970949613938720535_n.png?_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Ep8SArDyEakAX-gzY3l&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQHoRerYcp7p6HVxI2ctDe7QvHBPBooC9wsFmXoc-KNlg&oe=640AE6F3"
              />
            </div>
            <div className="header-song-content">
              <div className="header-song-content-title">Aape Music</div>
              <div className="header-song-content-artist-album">--</div>
            </div>
            <div className="header-song-duration"></div>
          </div>
        )}
      </div>
      <div className="header-volumn">
        <FontAwesomeIcon className="volume-icon" icon={faVolumeUp} />
        <input
          type="range"
          defaultValue="0"
          className="header-volumn"
          onChange={handleVolume}
        />
      </div>
      {user ? (
        <div className="header-account">
          <div className="header-account-main">
            <div className="header-account-avatar">
              <img
                className="header-account-avatar-content"
                src={`http://localhost:8080/api/v1/public/pictures/file/${nickname?.picture.id}`}
                alt=""
              />
            </div>
            <div className="header-account-name">{nickname?.firstname}</div>
            <div className="header-selection">
              <div className="header-selection-main">
                <Link to={"/account"} className="header-selection-settings">
                  <div className="header-selector-settings-content">
                    Tài Khoản
                  </div>
                </Link>
                <div className="header-selection-logout" onClick={handleLogout}>
                  <div className="header-selection-logout-content">
                    Đăng Xuất
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <audio
        ref={audioRef}
        src={`http://localhost:8080/api/v1/public/musics/file/${source}`}
        onLoad={() => handlePausePlayClick()}
      />
    </div>
  );
}

export default Header;
