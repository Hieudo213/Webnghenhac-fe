import { React, useState, useEffect,useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import './SongItem.css'
import axios from 'axios'
import { MusicContext } from '../../context/MusicContext'
import { getArtistById } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function SongItem() {
    let { id } = useParams();
    const artists = useSelector((state) => state.artist.artist?.Artist);
    const {isPlay,setPlay,curSong,setCurSong,source,setSource,audioRef,handlePausePlayClick} = useContext(MusicContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
        if (user?.token) {
          getArtistById(user?.token, dispatch, id);
        }
      }, []);
    
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
            audioRef.current.play();
          
          } else {
            audioRef.current.pause()
          }
        }
      }, [curSong])
     console.log(artists.name);
    return (
        <div className='container'>

            {/* Title */}
            <div className='song-title'>
                <h3 className='song-title-text'>
                    Top Song</h3>
            </div>

            <div className='song-content'>
                {artists && artists.songs.map(song => (
                    <div className='song-content-main' style={
                        song.id % 2 === 0 ? {backgroundColor : "#fff"} : {backgroundColor : "#fbfbfb"}
                      } key={song.id}>

                        <div className='song-content-avatar'>
                            <div className='song-content-img' onClick={()=>handlePausePlayClick(song)}>
                            <img className="album-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + song.single.picture.id} />
                            <div className="play-icon">
                        <FontAwesomeIcon
                          size="lg"
                          icon={
                            isPlay === true && curSong.id===song.id
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
                            
                                <div className='song-content-artist-text'>
                                    {artists.name}
                                </div>
                            

                        </div>

                        <div className='song-content-album'>
                            <div className='song-content-album-text'>
                                {song.album.title}
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
    )
}

export default SongItem