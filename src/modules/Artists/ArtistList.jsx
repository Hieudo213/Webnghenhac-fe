import {React, useState,useEffect} from 'react'
import './ArtistList.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

function ArtistList() {
  const [artists,setArtists] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/public/artists')
      .then(response => {
        setArtists(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className='container'>
      <div className='Header'>
        <div className='header-title'>
          <h1 className='header-title-text'>
            Artists
          </h1>
        </div>
      </div>
      <div className='Body'>
        <div className='artists'>
          {artists&&artists.map(artist=>(
            <Link className='artists-main' to={`/artists/${artist.id}`} key={artist.id}>
            <div className='artists-avatar'>
              <div className='artist-avatar-img'>
              <img className="artist-img-content" src={"http://localhost:8080/api/v1/public/pictures/file/" + artist.picture.id} />
              </div>
            </div>
            <div className='artists-name'>
              <div className='artists-name-text'>
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

export default ArtistList