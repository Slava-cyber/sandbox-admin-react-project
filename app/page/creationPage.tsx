import React from "react";
import Navbar from "../components/navbar";
import EventCreate from "../components/eventCreate";
import RequestCreate from "../components/requestCreate";
import UserCreate from "../components/userCreate";

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

