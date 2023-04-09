import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
function Playlist() {
    const[playlistInProcess,setPlaylistInProcess] = useState([]);
    const [donePlaylist,setDonePlaylist] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/playlists/admin/in-process/all")
          .then((response) => {
            setPlaylistInProcess(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/playlists/admin/done/all")
          .then((response) => {
            setDonePlaylist(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
    <div>
        <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                      In process Playlist
                    </h1>
                </div>

            </div>
            <div className="body">
                <div className="contents">
                {playlistInProcess&&playlistInProcess.map(playlist=>(
                    <Link to={`${playlist.id}`} key={playlist.id} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                         playlist.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {playlist.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>

            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                       Playlist in process
                    </h1>
                </div>

            </div>

                <div className="body">
                <div className="contents">
                {donePlaylist&&donePlaylist.map(playlist=>(
                    <Link to={`/admin/update/playlist/${playlist.id}`} key={playlist.id} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                         playlist.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {playlist.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>
    </div>
  )
}

export default Playlist