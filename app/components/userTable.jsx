import React, { useEffect , useState} from 'react';
import Table from './table.jsx';
import {getData} from './tablefunction.jsx';
import {deleteObject} from './tablefunction.jsx';
import {ColumnsUserTable} from './tablefunction.jsx';
import {ColumnsEventTable} from './tablefunction.jsx';
import {ColumnsRequestTable} from './tablefunction.jsx';


function UserTable(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(props.entity);
        //getData(props.entity);
        getData(props.entity)
            .then(
                response => setData(response)
            );
    }, []);

    var columns = [];
    var title = "";
    if (props.entity === 'user') {
        console.log('user');
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
                <div className={"col-md-12"}>
                    <Table columns={columns} data={data}/>
                </div>
            </div>
        </>
    );
}

export default UserTable;