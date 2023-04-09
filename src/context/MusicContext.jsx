import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
export const MusicContext = createContext({});
export const MusicProvider = ({ children }) => {
  const animationRef = useRef();
  const [songId,setSongId] = useState(0);
  const [picture, setPicture] = useState(36);
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState();
  const [title, setTitle] = useState();
  const audioRef = useRef();
  const [isPlay, setPlay] = useState(false);
  const [curSong, setCurSong] = useState(null);
  const [source, setSource] = useState(0);
  const [song, setSong] = useState();
  const [singleId, setSingleId] = useState(0);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const progressBar = useRef();
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  }
  const handleNext = () => {
    if (!isPlay) {
      setSource((source) => source + 1);
      setPlay(true);
      audioRef.current.play();
    }
    setSource((source) => source + 1);

  };
  const handlePrev = () => {
    if (source >= 1) setSource((source) => source - 1);
  };
  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value / 100;
  };
  const handlePausePlayClick = (song) => {
    // Dang choi nhac
    if (isPlay) {
      // Dang choi nhung muon dung
      if (curSong.id === song.id) {
        setPlay(false);
        audioRef.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
      // chuyen bai
      if (curSong.id !== song.id) {
        setSongId(song.single.id);
        setCurSong(song);
        setSong(song);
        setSource(song.music.id);
        setPlay(true);
        setTitle(song.title);
        setArtists(song.artists);
        setAlbum(song.album.title);
        setPicture(song.single.picture.id);
        setSingleId(song.single?.id);
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    }
    // Dang khong choi nhac
    else {
      // Truong hop chua co bai nao duoc bat
      if (curSong === null) {
        setSongId(song.single.id);
        setCurSong(song);
        setSong(song);
        setSource(song.music.id);
        setPlay(true);
        setTitle(song.title);
        setArtists(song.artists);
        setAlbum(song.album.title);
        setPicture(song.single.picture.id);
        setSingleId(song.single.id);
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
      // Truong hop dung lai ma muon choi tiep bai do
      if (curSong.id === song.id) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
        setPlay(true);
      }

      // Truong hop dung lai ma muon chuyen bai
      if (curSong.id !== song.id) {
        setSongId(song.single.id);
        setCurSong(song);
        setSource(song.music.id);
        setSong(song);
        setPlay(true);
        setTitle(song.title);
        setArtists(song.artists);
        setAlbum(song.album.title);
        setPicture(song.single.picture.id);
        setSingleId(song.single.id);
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlay,
        setPlay,
        curSong,
        setCurSong,
        source,
        setSource,
        audioRef,
        handlePausePlayClick,
        artists,
        setArtists,
        album,
        setAlbum,
        title,
        setTitle,
        picture,
        setPicture,
        song,
        setSong,
        singleId,
        setSingleId,
        user,
        handlePrev,
        handleVolume,
        handleNext,
        progressBar,
        duration,
        currentTime,
        setCurrentTime,
        setDuration,
        songId
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
