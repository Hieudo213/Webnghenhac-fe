import './Browse.css'
import { React, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Browse() {
    const [browses, setBrowses] = useState([])
    const [playlists,setPlaylists] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/public/browses')
            .then(response => {
                console.log(response);
                setBrowses(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/public/playlists')
            .then(response => {
                console.log(response);
                setPlaylists(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div id='container'>
            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                        Browse
                    </h1>
                </div>
            </div>
            <div className="Body">
                {/*Big Content */}
                <div className="big-content">
                    {browses && browses.map(browse => (
                        <div className='big-content-main' key={browse.id}>
                            <div className='big-content-title'>
                                {browse.title}
                            </div>

                            <div className='big-content-description'>
                                {browse.description}
                            </div>

                            <div className='big-content-genre'>
                                {browse.category.name}
                            </div>

                            <div className='big-content-img'>
                                <img
                                    className="browse-img-content"
                                    src={
                                        "http://localhost:8080/api/v1/public/pictures/file/" +
                                        browse.picture.id
                                    }
                                />
                            </div>
                        </div>
                    ))}


                    {/*Small Content */}
                </div>
                <div className='small-content'>
                    <div className='small-content-title'>
                        <h1 className='small-content-title-text'>
                            Listen your favorite artist
                        </h1>
                    </div>
                    <div className='small-content-list'>
                        {playlists&&playlists.map(playlist=>(
                            <Link className='list_contents-main' key={playlist.id} to={`/playlist/${playlist.id}`}>
                            <div className='list_contents-img'>
                               
                                <img
                                    className="playlist-img-content"
                                    src={
                                        "http://localhost:8080/api/v1/public/pictures/file/" +
                                         playlist.picture.id
                                    }
                                />
        
                            </div>
                            <div className='list_contents-img-name'>
                                <div className='list_contents-img-name-content'>
                                       {playlist.title}
                                </div>
                            </div>
                            <div className='list_contents-genre'>
                                  {playlist.category.name}
                            </div>
                        </Link>
                        ))}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}