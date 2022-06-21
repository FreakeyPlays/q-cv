import {faGrip, faUser, faGraduationCap, faBriefcase, faLaptopCode, faClipboard, faPlus} from "@fortawesome/free-solid-svg-icons"

export const MenuItems = [
    {
        title: "Dashboard",
        url: "/",
        className: "navLink",
        icon: faGrip
    },
    {
        title: "User Data",
        url: "/user-data",
        className: "navLink",
        icon: faUser
    },
    {
        title: "Education",
        url: "/education",
        className: "navLink",
        icon: faGraduationCap
    },
    {
        title: "Career",
        url: "/career",
        className: "navLink",
        icon: faBriefcase
    },
    {
        title: "IT-Skills",
        url: "/it-skills",
        className: "navLink",
        icon: faLaptopCode
    },
    {
        title: "Projects",
        url: "/projects",
        className: "navLink",
        icon: faClipboard
    },
    {
        title: "User",
        url: "/AdminUserData",
        className: "navLink",
        icon: faPlus
    }
]