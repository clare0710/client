import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./SearchList.css";
import axios from 'axios';
import Cookies from 'js-cookie'
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlusSquare } from 'react-icons/fa';
import DropDownBtn from './DropDownBtn';
import SpotifyPlayer from "react-spotify-web-playback";

import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDownBtn.css";
import VerticalMenu from "../img/vertical_menu.svg";
import { DropdownButton, Dropdown } from 'react-bootstrap';

import Popup from './Popup'
import "./Popup.css"

function SearchList() {
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [toptracks, setTopTracks] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [play, setPlay] = useState(false)

    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonPopup1, setButtonPopup1] = useState(false)
    const [buttonPopup2, setButtonPopup2] = useState(false)
    const [viewArtists, setViewArtists] = useState([])
    const [viewAlbum, setViewAlbum] = useState([])
    const [trackId, setTrackId] = useState([])
    const [viewArtistsList, setViewArtistsList] = useState([])
    const [viewAlbumList, setViewAlbumList] = useState([])
    const [viewRecList, setViewRecList] = useState([])

    useEffect(() => setPlay(true), [playingTrack])

    const searchTracks = async (e) => {
        e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                q: searchKey,
                type: "track",
                limit: 10
            }
        })
        console.log(data)
        setTracks(data.tracks.items)
    }


    const renderTracks = () => {
        return tracks.map((track, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}.</div>
                    <div><img src={track.album.images[2].url} className="image" alt='album_image' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{track.name}</div>
                        <div className="information-horizontal-center2">{track.artists[0].name}</div>
                    </div>
                    <div><audio src={track.preview_url} className="audio" controls>
                    </audio></div>
                    <div><Button className="listen-button" onClick={() => setPlayingTrack(track.uri)} >Listen</Button></div>
                    <DropdownButton variant="outline-light" className="vertical-menu-button"

                        title={
                            <img className='vertical-menu-icon' alt='vertical_menu_icon' src={VerticalMenu} />
                        }
                        onClick={() => {
                            setViewAlbum(track.album.id);
                            setViewArtists(track.artists[0].id);
                            setTrackId(track.id)
                        }}
                    >
                        <Dropdown.Item onClick={() => { setButtonPopup(true); ViewAlbum() }}>View album</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setButtonPopup1(true); ViewArtist() }}>View artist</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setButtonPopup2(true); ViewRec() }}>Recommended song</Dropdown.Item>
                    </DropdownButton>
                </ListGroup.Item>
            </ListGroup>
        ))
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                q: searchKey,
                type: "artist",
                limit: 10
            }
        })
        console.log(data)
        setArtists(data.artists.items)
        const { id } = data.artists.items[0].id
        console.log("id", id)
        const { data2 } = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                market: "TW"
            }
        })
        console.log("data2", data2)
        setTopTracks(data2.tracks)
    }

    const renderArtists = () => {

        return artists.map((artist, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}.</div>
                    <div><img src={artist.images[0].url} className="image" alt='artist_image' width='64' height='64' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{artist.name}</div>
                        <div className="information-horizontal-center">{artist.genres[0]}</div>
                    </div>
                    {/* <div><FaPlusSquare className="add-track-button" onClick={TopTracks} /></div> */}
                    <Button type="submit" className="search-song-button" onClick={TopTracks}>Top tracks</Button>
                    {/* <DropDownBtn /> */}
                </ListGroup.Item>
            </ListGroup>
        ))
    }



    const TopTracks = async (e) => {
        e.preventDefault()
        const data = artists.map(async artist => {
            const d = await axios.get(`https://api.spotify.com/v1/artists/${artists[0].id}/top-tracks`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
                params: {
                    market: "TW"
                }
            })

            setTopTracks(d.data.tracks) //set first aritst's top tracks
            console.log(d.data.tracks)
        })
    }

    const renderTopTracks = () => {  //can only render first aritst's top tracks
        return toptracks.map((toptrack, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}.</div>
                    <div><img src={toptrack.album.images[0].url} className="image" alt='artist_image' width='64' height='64' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{toptrack.name}</div>
                        <div className="fw-bold information-horizontal-center">{toptrack.artists[0].name}</div>
                    </div>
                    <div><audio src={toptrack.preview_url} className="audio" controls></audio></div>
                    <div><FaPlusSquare className="add-track-button" /></div>
                    <DropDownBtn />
                </ListGroup.Item>
            </ListGroup>
        ))
    }

    const ViewAlbum = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get(`https://api.spotify.com/v1/albums/${viewAlbum}/tracks`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }

        })
        console.log(data)
        setViewAlbumList(data.items)
    }

    const renderViewAlbum = () => {
        return viewAlbumList.map((track, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}.</div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{track.name}</div>
                    </div>
                    <div><Button className="listen-button" onClick={() => setPlayingTrack(track.uri)} >Listen</Button></div>
                </ListGroup.Item>
            </ListGroup>
        ))
    }

    const ViewArtist = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get(`https://api.spotify.com/v1/artists/${viewArtists}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                market: "TW"
            }
        })
        console.log(data.tracks)
        setViewArtistsList(data.tracks)
    }
    const renderViewArtists = () => {
        return viewArtistsList.map((track, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}</div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{track.name}</div>
                    </div>
                    <div><Button className="listen-button" onClick={() => setPlayingTrack(track.uri)} >Listen</Button></div>
                </ListGroup.Item>
            </ListGroup>
        ))
    }
    const ViewRec = async (e) => {
        //e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/recommendations", {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                seed_artists: viewArtists,
                seed_genres: "pop",
                seed_tracks: trackId,
                limit: 5,
                market: "TW"
            }
        })
        console.log(data)
        setViewRecList(data.tracks)
    }
    const renderViewRec = () => {
        return viewRecList.map((track, index) => (
            <ListGroup>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="number-horizontal-center">{index + 1}</div>
                    <div><img src={track.album.images[2].url} className="image" alt='album_image' /></div>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold information-horizontal-center">{track.name}</div>
                        <div className="information-horizontal-center2">{track.artists[0].name}</div>
                    </div>
                    <div><Button className="listen-button" onClick={() => setPlayingTrack(track.uri)} >Listen</Button></div>
                </ListGroup.Item>
            </ListGroup>
        ))
    }

    return (
        <div >
            <SpotifyPlayer
                token={Cookies.get('access_token')}
                showSaveIcon
                uris={playingTrack ? [playingTrack] : []}
                callback={state => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
            />
            <Form className="search-form">
                <Form.Group>
                    <Form.Control className="search-box" placeholder="Search by song or artist..." onChange={e => setSearchKey(e.target.value)} />
                </Form.Group>
                <Button type="submit" className="search-song-button" onClick={searchTracks}>Songs</Button>
                {/* <Button type="submit" className="search-artist-button" onClick={searchArtists}>Artists</Button> */}

                <ListGroup className="search-list">
                    {renderTracks()}
                </ListGroup>
                {/*  <ListGroup className="search-list2">
                    {renderArtists()}
                </ListGroup>
                <ListGroup className="search-list3">
                    {renderTopTracks()}
                </ListGroup>  */}
            </Form>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <ListGroup>
                    <br></br>
                    <br></br>
                    {renderViewAlbum()}
                </ListGroup>
            </Popup>
            <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
                <ListGroup>
                    <br></br>
                    <br></br>
                    {renderViewArtists()}
                </ListGroup>
            </Popup>
            <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
                <ListGroup>
                    <br></br>
                    <br></br>
                    {renderViewRec()}
                </ListGroup>
            </Popup>

        </div>

    );
}

export default SearchList;