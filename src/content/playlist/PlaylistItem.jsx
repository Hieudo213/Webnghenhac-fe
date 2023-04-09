import {React,useEffect,useState,useRef} from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useParams } from 'react-router-dom';
function PlaylistItem() {
    let {id} = useParams();
    const audioRef = useRef();
  const [isPlay, setPlay] = useState(false);
  const [curSong, setCurSong] = useState(null);
    const [single,setSingle] = useState()
    const [source, setSource] = useState(0)
    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/v1/public/playlists/${id}`)
          .then((response) => {
            
            setSingle(response.data);
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

      const handlePausePlayClick = (song) => {
        // Dang choi nhac 
        if(isPlay) {
          // Dang choi nhung muon dung 
          if(curSong.id === song.id){
            setPlay(false)
            audioRef.current.pause()
          }
          // chuyen bai
          if(curSong.id!==song.id){   
            setCurSong(song);
            setSource(song.id)
            setPlay(true)
            audioRef.current.play()
          }
        }
        // Dang khong choi nhac
         else {
          // Truong hop chua co bai nao duoc bat 
          if(curSong===null){
          setCurSong(song);
          setSource(song.id)
           setPlay(true);
         audioRef.current.play()
    
          
          }
          // Truong hop dung lai ma muon choi tiep bai do 
          if(curSong.id===song.id){
             audioRef.current.play()
            setPlay(true)
            
          }
          
          // Truong hop dung lai ma muon chuyen bai 
          if(curSong.id!==song.id){
           
            setCurSong(song)
            setSource(song.id)
             setPlay(true)
            audioRef.current.play()
          }
          
        }
    
        // if(!isPlay&&curSong===null){
        //     setPlay(true);
        //     setCurSong(song)
        //     setSource(song.id)
        //     audioRef.current.play()
        //     return;
        // }
        
      };
     
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
                   <div className='song-content-main'>

                <div className='song-content-avatar'>
                    <div className='song-content-img' >
                    <img className="album-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + single.picture.id} />
                    <div className="play-icon" onClick={()=>handlePausePlayClick(song)}>
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
             <audio ref={audioRef}
                src = {`http://localhost:8080/api/v1/public/musics/file/${source}`}
                onLoad={()=>handlePausePlayClick()}
                 />
            </div>
          </div>
        </div>
      </div>
    )}
        
      
    </div>
  )
}

export default PlaylistItem