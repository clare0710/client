import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Cookies from 'js-cookie';

const Profile = () => {

    return (
        <div>
            <div>
                <Image src={Cookies.get('image')} roundedCircle width={130} height={130} />
                <div
                    classNeam="username"
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "0",
                        width: "1070px",
                        height: "80px",
                        lineHeight: "10px",
                        fontFamily: "Arial"
                    }}
                >
                    <h3>{Cookies.get('username')}</h3>
                    <div
                        classNeam="userInfo"
                        style={{
                            position: "absolute",
                            top: "45px",
                            right: "0",
                            width: "1070px",
                            height: "20px",
                            lineHeight: "0px",
                            fontFamily: "Arial"
                        }}
                    >
                        <h4>Favorite Genre: Pop</h4>
                        <h4>Recently played</h4>
                    </div>
                </div>
                <div
                    className="TopSongs"
                    style={{
                        position: "absolute",
                        right: "1090px",
                        top: "130px",
                        fontFamily: "Arial"
                    }}
                >
                    <h1>Top Songs</h1>
                </div>
                <div
                    classNeam="topsong1"
                    style={{
                        position: "absolute",
                        top: "200px",
                        right: "1000px",
                        width: "170px",
                        height: "170px",
                        border: "3px solid #DDDDDD",
                        borderRadius: "10px",
                        fontFamily: "Arial"
                    }}
                >
                    <img
                        style={{
                            width: "100px",
                            height: "100px",
                            position: "absolute",
                            left: "40px",
                            top: "10px"
                        }}
                        src="https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg"
                    />
                    <h4
                        style={{
                            position: "relative",
                            left: "50px",
                            top: "95px"
                        }}
                    >
                        song name
                    </h4>
                    <h4
                        style={{
                            position: "relative",
                            left: "60px",
                            top: "80px"
                        }}
                    >
                        Artist
                    </h4>
                    <Button>+</Button>
                </div>
                <div
                    classNeam="topsong2"
                    style={{
                        position: "absolute",
                        top: "200px",
                        right: "750px",
                        width: "170px",
                        height: "170px",
                        border: "3px solid #DDDDDD",
                        borderRadius: "10px",
                        fontFamily: "Arial"
                    }}
                >
                    <img
                        style={{
                            width: "100px",
                            height: "100px",
                            position: "absolute",
                            left: "40px",
                            top: "10px"
                        }}
                        src="https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg"
                    />
                    <h4
                        style={{
                            position: "relative",
                            left: "50px",
                            top: "95px"
                        }}
                    >
                        song name
                    </h4>
                    <h4
                        style={{
                            position: "relative",
                            left: "60px",
                            top: "80px"
                        }}
                    >
                        Artist
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Profile