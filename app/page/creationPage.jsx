import React from "react";
import Navbar from "../components/navbar.jsx";
import EventCreate from "../components/eventCreate.jsx";
import RequestCreate from "../components/requestCreate.jsx";
import UserCreate from "../components/userCreate.jsx";

function CreationPage(props) {
    document.title = props.title;

    var entityOfCreation =
        {
            'user': UserCreate,
            'event': EventCreate,
            'request': RequestCreate,
        }

    var navbarActiveTabs =
        {
            'user': '',
            'event': '',
            'request': '',
        };

    var Component = entityOfCreation[props.entity];

    return (
        <>
            <Navbar navbarActiveTabs={navbarActiveTabs}/>
            <Component/>
        </>
    )
}

export default CreationPage;

