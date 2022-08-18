import React from 'react';
import ListLinksHtml from "./htmlBlocks/listLinksHtml";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
            <a href="" className="navbar-brand p-2">Sandbox</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <div className="container-fluid d-flex justify-content-end">
                    <ul className="navbar-nav nav-pills align-items-center mr-auto">
                        <ListLinksHtml classLi={'nav-item text-center'} classA={"nav-link"}
                                       link={"/admin/user"} title={"Пользователи"} active={props.navbarActiveTabs.user}/>
                        <ListLinksHtml classLi={'nav-item text-center'} classA={"nav-link"}
                                       link={"/admin/event"} title={"Ивенты"} active={props.navbarActiveTabs.event}/>
                        <ListLinksHtml classLi={'nav-item text-center'} classA={"nav-link"}
                                       link={"/admin/request"} title={"Запросы"} active={props.navbarActiveTabs.request}/>
                        <ListLinksHtml classLi={'nav-item text-center'} classA={"nav-link"} link={"/main"} title={"Главная"}/>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/images/system/profile1.png" alt="" width="40" height="40"/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <ListLinksHtml classLi={""} classA={"dropdown-item"} link={"/logout"} title={"Выйти"}/>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;