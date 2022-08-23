import React, { useEffect , useState} from 'react';
import Table from './table';
import {
    getData,
    deleteObject,
    ColumnsUserTable,
    ColumnsEventTable,
    ColumnsRequestTable} from './jsFunctions/tableFunction';

function DataTable(props: {entity: string}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData(props.entity)
            .then(
                (response : any) => setData(response)
            );
    }, []);

    const titleArray: {
        [key: string]: string
    } = {
        'user': "Таблица пользователей",
        'event': "Таблица ивентов",
        'request': "Таблица запросов"
    };

    const columnDataFunction: {
        [key: string]: (
            props: { entity: string },
            setData: (value: (((prevState: any[]) => any[]) | any[])) => void,
            deleteObject: (
                id: number,
                entity: string,
                setData: (value: (((prevState: any[]) => any[]) | any[])) => void) => void) => any[]
    } = {
        'user': ColumnsUserTable,
        'event': ColumnsEventTable,
        'request': ColumnsRequestTable
    }

    let columns = columnDataFunction[props.entity] ? columnDataFunction[props.entity](props, setData, deleteObject) : [];
    let title = titleArray[props.entity] ? titleArray[props.entity] : "";

    return (
        <>
            <div className={"row"}>
                <div className={"col-md-12 text-center my-3"}>
                    <h3>{title}</h3>
                </div>
                <div className={"text-secondary ms-4 mb-2"}>
                    <a className={"text-secondary"} href={'/admin/' + props.entity + '/create'}> Добавить запись </a>
                </div>
                <div className={"col-md-12"}>
                    <Table columns={columns} data={data}/>
                </div>
            </div>
        </>
    );
}

export default DataTable;