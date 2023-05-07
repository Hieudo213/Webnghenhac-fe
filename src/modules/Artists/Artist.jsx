import './Artist.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {React,useEffect,useState} from 'react'
export default function Artist(){
    const [InProcessArtist,setInProcessArtist] = useState([]);
    const [doneArtist,setDoneArtist] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/artists/admin/in-process/all")
          .then((response) => {
            setInProcessArtist(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/artists/admin/done/all")
          .then((response) => {
            setDoneArtist(response.data);
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
                    In Progress Artists 
                    </h1>
                </div>

            </div>
            <div className="body">
                <div className="contents">
                {InProcessArtist&&InProcessArtist.map(InProcessArtist=>(
                    <Link to={`/admin/artist/${InProcessArtist.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="artist-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          InProcessArtist.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {InProcessArtist.name}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>

            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                        Artists are not activated
                    </h1>
                </div>

            </div>

            <div className="body">
                <div className="contents">
                {doneArtist&&doneArtist.map(artist=>(
                    <Link to={`/admin/artist/${artist.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="artist-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          artist.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {artist.name}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>
       </div>
    )
}