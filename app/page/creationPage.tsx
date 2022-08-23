import React from "react";
import Navbar from "../components/navbar";
import EventCreate from "../components/eventCreate";
import RequestCreate from "../components/requestCreate";
import UserCreate from "../components/userCreate";

interface page {
    title: string,
    entity: string
}


function CreationPage(props : page) {
    document.title = props.title;

    let entityOfCreation: {
        [key:string]: any
    } =
        {
            'user': UserCreate,
            'event': EventCreate,
            'request': RequestCreate,
        }

    let navbarActiveTabs: {
        [key:string]: string
    }=
        {
            'user': '',
            'event': '',
            'request': '',
        };

    let Component = entityOfCreation[props.entity];

    return (
        <>
            <Navbar navbarActiveTabs={navbarActiveTabs}/>
            <Component/>
        </>
    )
}

export default CreationPage;

