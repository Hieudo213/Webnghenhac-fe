
import axios from 'axios'
import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';

export default function Song(){
    const [inProcessSong,setInProcessSong] = useState([]);
    const [doneSong,setDoneSong] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/songs/admin/in-process/all")
          .then((response) => {
            setInProcessSong(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);


      useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/songs/admin/done/all")
          .then((response) => {
            setDoneSong(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    return(
       <div id='container'>
       <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                       In process Songs
                    </h1>
                </div>

            </div>
            <div className="body">
                <div className="contents">
                {inProcessSong&&inProcessSong.map(album=>(
                    <Link to={`/admin/song/${album.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjXpHlF8K-lHUZgPj5DYvFRfIthm2kMa0QQ&usqp=CAU'
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {album.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>

            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                      Done Songs
                    </h1>
                </div>

            </div>

            <div className="body">
                <div className="contents">
                {doneSong&&doneSong.map(album=>(
                    <Link to={`/admin/song/${album.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {album.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>


       </div>
    )
}