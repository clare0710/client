import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Cookies from 'js-cookie'
import "./Appbar.css";

function Appbar() {
    return (
        <Navbar className="color-nav" expand="md">
            <Container>
                <Navbar.Brand href="/search" className="text-bold">S•poll•tify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <DropdownButton

                        title={
                            <Image src={Cookies.get('image')} roundedCircle width={40} height={40} />
                        }
                    >
                        <Dropdown.Item href={'/profile'}>User Profile</Dropdown.Item>
                        <Dropdown.Item href={'/'}>Sign out</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default Appbar;