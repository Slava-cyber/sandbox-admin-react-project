import React from "react";
import Navbar from "../components/navbar";
import DataTable from "../components/dataTable";

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