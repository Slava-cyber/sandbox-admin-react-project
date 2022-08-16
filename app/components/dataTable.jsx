import React, { useEffect , useState} from 'react';
import Table from './table.jsx';
import {getData} from './tableFunction.jsx';
import {deleteObject} from './tableFunction.jsx';
import {ColumnsUserTable} from './tableFunction.jsx';
import {ColumnsEventTable} from './tableFunction.jsx';
import {ColumnsRequestTable} from './tableFunction.jsx';


function DataTable(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData(props.entity)
            .then(
                response => setData(response)
            );
    }, []);

    let columns = [];
    let title = "";
    if (props.entity === 'user') {
        columns = ColumnsUserTable(props, setData, deleteObject);
        title = "Таблица пользователей";
    } else if (props.entity === 'event') {
        columns = ColumnsEventTable(props, setData, deleteObject);
        title = "Таблица ивентов";
    } else if (props.entity === 'request') {
        columns = ColumnsRequestTable(props, setData, deleteObject);
        title = "Таблица запросов";
    }

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