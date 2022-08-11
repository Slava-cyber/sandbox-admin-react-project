import React from "react";
import Navbar from "../components/navbar.jsx";
import DataTable from "../components/DataTable.jsx";

function PageWithDataTable(props) {

    document.title = props.title;

    var NavbarActiveTabs =
        {
            'user': '',
            'event': '',
            'request': '',
        };

    NavbarActiveTabs[props.entity] = 'active';

    return (
        <>
            <Navbar navbarActiveTabs={NavbarActiveTabs}/>
            <DataTable entity={props.entity}/>
        </>
    )
}

export default PageWithDataTable;