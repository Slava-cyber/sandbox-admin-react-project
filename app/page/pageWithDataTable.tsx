import React from "react";
import Navbar from "../components/navbar";
import DataTable from "../components/dataTable";


interface page {
    title: string,
    entity: string
}


function PageWithDataTable(props: page) {
    document.title = props.title;

    let NavbarActiveTabs: {
        [key: string]: string,
    } =
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