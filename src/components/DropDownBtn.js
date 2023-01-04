import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDownBtn.css";
import VerticalMenu from "../img/vertical_menu.svg";
import { DropdownButton, Dropdown } from 'react-bootstrap';

export class DropDownBtn extends Component {
    render() {
        return (
            <DropdownButton variant="outline-light" className="vertical-menu-button"

                title={
                    <img className='vertical-menu-icon' alt='vertical_menu_icon' src={VerticalMenu} />
                }
            >
                <Dropdown.Item>View album</Dropdown.Item>
                <Dropdown.Item>View artist</Dropdown.Item>
                <Dropdown.Item>Recommended song</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default DropDownBtn;