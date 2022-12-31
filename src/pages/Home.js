import React from 'react';
import { Button } from 'semantic-ui-react';
import SpotifyImg from "../img/spotify_Icon.png";
import "./Home.css";

const Home = () => {

    return (<div >
        <header className="App-header">
            <p className="text-center">
                S•poll•tify
            </p>
            <a className='button-center' href='http://localhost:3000/api/v1/sign_in'><Button background-color='#4CAF50'>
                <img className='.button-center ' src={SpotifyImg} width="30" alt='spotify_icon' /> Sign in with Spotify
            </Button></a>
        </header>
    </div >);
};

export default Home;