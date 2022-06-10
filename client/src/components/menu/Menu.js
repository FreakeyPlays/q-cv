import React from "react";
import "./Menu.css";
import { MenuItems } from "./Menu.items.js"
import { NavLink } from 'react-router-dom'
import UserService from "../../services/keycloakUser.service.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Menu = ({ children }) => {
    React.useEffect(() => {
        const menu = document.getElementById("menu");

        const menuToggleOpen = document.getElementById("menuBtn");
        menuToggleOpen.onclick = () => {
            menu.classList.toggle("showMenu");
        }

        const menuToggleClose = document.getElementById("mobileClose");
        menuToggleClose.onclick = () => {
            menu.classList.toggle("showMenu");
        }
    });

    return(
        <>
        <nav className="menu" id="menu">
            <div className="logo_section">
                <img className="logo" src="/logo.png" alt="logo"></img>
                <div className="profile_section">
                    <img className="profile_image" src="/profile.webp" alt="profile"></img>
                    <div className="profile">
                        <span id="userId">
                            John Doe
                        </span>
                        <p className="logoutBtn" onClick={UserService.doLogout}>
                            Log out
                        </p>
                    </div>
                </div>
            </div>
            <ul className="navigation_list">
                {MenuItems.map((item, index) => {
                    return(
                        <li className={item.className} key={index}>
                            <NavLink to={item.url} className={(navData) => (navData.isActive ? "activeLink" : "")}>
                                <FontAwesomeIcon icon={item.icon} className="menuOptionIcon" />
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            <div className="mobileClose" id="mobileClose">
                <div className="menuBtnClose">
                    <FontAwesomeIcon icon={faXmark} className="menuOpenClose" />
                </div>
            </div>
        </nav>
        <div className="mobileMenu" id="menuBtn">
            <div className="menuBtn">
            <FontAwesomeIcon icon={faAngleRight} className="menuOpenClose" />
            </div>
        </div>
        <div className="content">
            { children }
        </div>
        </>
    )
}

export default Menu;