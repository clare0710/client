import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Cookies from 'js-cookie';
import Appbar from "../components/Appbar";
import "../components/Appbar.js";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlusSquare } from 'react-icons/fa';

const Profile = () => {

    const [userName, setUserName] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [topArtists, setTopArtists] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        UserName()
        TopTracks()
        TopArtists()
        History()
    }, []);

    const UserName = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }

        })
        console.log(data)
        setUserName(data.display_name)
    }
    const TopTracks = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                limit: 5
            }

        })
        console.log(data)
        setTopTracks(data.items)
    }

    const renderTopTracks = () => {  //can only render first aritst's top tracks
        return topTracks.map((topTrack, index) => (
            <ListGroup >
                <ListGroup.Item
                    className="item"
                >
                    <div><img src={topTrack.album.images[0].url} className="cover" alt='artist_image' width='90' height='90' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{topTrack.name}</div>
                        <div className="information-horizontal-center2">{topTrack.artists[0].name}</div>
                    </div>
                    {/* <div><FaPlusSquare className="add-track-button" /></div> */}
                </ListGroup.Item>
            </ListGroup>
        ))
    }

    const TopArtists = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                limit: 5
            }

        })
        console.log(data)
        setTopArtists(data.items)
    }

    const renderArtists = () => {
        return topArtists.map((topArtist, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="item"
                >
                    <div><img src={topArtist.images[0].url} className="cover-circle" alt='artist_image' width='100' height='100' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{topArtist.name}</div>
                        <div className="information-horizontal-center">{topArtist.genres[0]}</div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        ))
    }
    const History = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                limit: 5
            }

        })
        console.log(data)
    }

    return (
        <div>
            <header><Appbar /></header>
            <h3 className="username">{userName}</h3>
            <div>
                <Image src={Cookies.get('image')} roundedCircle width={110} height={110} className="profileImg" />
            </div>
            <h3 className="profileImg">Top Songs</h3>
            <ListGroup horizontal className="toptracks-list" >
                {renderTopTracks()}
            </ListGroup>
            <h3 className="profileImg">Top Artists</h3>
            <ListGroup horizontal className="toptracks-list">
                {renderArtists()}
            </ListGroup>
        </div>
    );
};

export default Profile