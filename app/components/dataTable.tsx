import React, { useEffect , useState} from 'react';
import Table from './table';
import {
    getData,
    ColumnsUserTable,
    ColumnsEventTable,
    ColumnsRequestTable} from './jsFunctions/tableFunction';

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { update } from '../store/slice';

function DataTable(props: {entity: string}) {
    const data = useAppSelector(state => state.slice.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getData(props.entity)
            .then(
                (response: any) => dispatch(update(response))
            );
    }, [dispatch]);

    const titleArray: {
        [key: string]: string
    } = {
        'user': "Таблица пользователей",
        'event': "Таблица ивентов",
        'request': "Таблица запросов"
    };

    const columnDataFunction: {
        [key: string]: (
            props: { entity: string }
        ) => any[]
    } = {
        'user': ColumnsUserTable,
        'event': ColumnsEventTable,
        'request': ColumnsRequestTable
    }

    let columns = columnDataFunction[props.entity] ? columnDataFunction[props.entity](props) : [];
    let title = titleArray[props.entity] ? titleArray[props.entity] : "";

    return (
        <>
            <div className={"row"}>
                <div className={ "col-md-12 text-center my-3"}>
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