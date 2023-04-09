import {React,useEffect,useState,useRef,useContext} from 'react'
import axios from 'axios'
import './SingleItem.css' 
import { getSingleById } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useParams } from 'react-router-dom';
import { MusicContext } from '../../context/MusicContext';
function SingleItem() {
    let {id} = useParams();
   const [single,setSingle] = useState();
    const {isPlay,setPlay,curSong,setCurSong,source,audioRef,handlePausePlayClick} = useContext(MusicContext)
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/v1/public/singles/${id}`)
        .then((response) => {
          setSingle(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);

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

      
  return (
    <div className='container'>
    {single&& (
        <div>
        <div className="album-detail">
          <div className="album-img">
          <img className="album-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + single.picture.id} />
          </div>
          <div className="album-content">
            <div className="album-title">
            {single.title}
            </div>
            <div className="album-publish">
            {single.publisher}            
            </div>
            <div className="album-description">
              <div className="album-description-text">
             {single.description}
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
             {single.songs.map(song =>(
                   <div className='song-content-main' style={
                    song.id % 2 === 0 ? {backgroundColor : "#fff"} : {backgroundColor : "#fbfbfb"}
                  } key={song.id}>

                <div className='song-content-avatar'>
                    <div className='song-content-img'onClick={()=>handlePausePlayClick(song)} >
                    <img className="album-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + single.picture.id} />
                    <div className="play-icon" >
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
                   
                {song.artists.map(artist => (
                          <div className='song-content-artist-text'>
                             {artist.name}
                          </div>
                      ))}
                  

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
        </div>
      </div>
    )}
        
      
    </div>
  )
}

export default SingleItem