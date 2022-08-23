import React, {useMemo, useState} from 'react';

import Select from "../htmlBlocks/select";
import DeleteModalWindow from "../htmlBlocks/modalWindow";
import FetchRequest from "./fetchRequest";
import {CellProps} from 'react-table';

interface CustomRow {
    id?: number;
}

export const getData = (entity : string): any => {
    return new Promise(function(resolve, reject) : any {
        FetchRequest(
            JSON.stringify({'entity': entity}),
            "POST",
            '/allDataApiRequest')
            .then(response => response.json())
            .then((data) => {
                if (data.status == false) {
                    resolve([]);
                } else {
                    resolve(data);
                }
            });
    })
}

export const deleteObject = (
    id : number,
    entity : string,
    setData: (value: (((prevState: any[]) => any[]) | any[])) => void): void => {
    FetchRequest(
        JSON.stringify (
            {
                'entityType': entity,
                'id': id
            }),
        "POST",
        '/userApiDelete')
        .then(response => response.json())
        .then((data) => {
            if (data['status']) {
                getData(entity)
                    .then(
                        (response : any) => {
                            setData(response as any[])
                        }
                    );
            }
        });
}

export const changeRole = (event: React.SyntheticEvent, id: number) => {
    FetchRequest(
        JSON.stringify (
            {
                'role': (event.target as HTMLInputElement).value,
                'id': id
            }),
        "POST",
        '/userChangeRole')
        .then(response => response.json())
        .then((data) => {
        });
}

export const ColumnsUserTable = (
    props: {entity: string},
    setData: (value: (((prevState: any[]) => any[]) | any[])) => void,
    deleteObject: (
        id: number,
        entity: string,
        setData: (value: (((prevState: any[]) => any[]) | any[])) => void) => void): any[] => {
    const options = ["administrator", "user", "advanced user"];

    const columns = React.useMemo(
        () => [
            {
                Header: "Имя",
                accessor: "name",
            },
            {
                Header: "Фамилия",
                accessor: "surname",
            },
            {
                Header: "Логин",
                accessor: "login",
                Cell: (props: CellProps<CustomRow, string>) => <a href={'/profile/' + props.cell.value}> {props.cell.value} </a>
            },
            {
                Header: "Email",
                accessor: "email",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-",
            },
            {
                Header: "Время Регистрации",
                accessor: "dateCreated",
                Cell: (props: CellProps<CustomRow, Date>) => props.cell.value || "-",
            },
            {
                Header: "Аватар",
                accessor: "avatar",
                Cell: (props: CellProps<CustomRow, string>) => <img className="rounded-circle image-admin"
                                src={props.cell.value ? props.cell.value : "/images/system/avatar_null.jpg"}/>
            },
            {
                Header: "Дата рождения",
                accessor: "dateOfBirth",
            },
            {
                Header: "Город",
                accessor: "town",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-",
            },
            {
                Header: "Рейтинг",
                accessor: "rating",
                Cell: (props: CellProps<CustomRow, number>) => props.cell.value || "-",
            },
            {
                Header: "Количество отзывов",
                accessor: "numberOfReviews",
                Cell: (props: CellProps<CustomRow, number>) => props.cell.value || "-",
            },
            {
                Header: "Роль",
                accessor: "role",
                minWidth: 200,
                Cell: (props: CellProps<CustomRow, string>) => <Select options = {options} id={"role"} selected={props.cell.value}
                                 change = {(event: React.SyntheticEvent) => {changeRole(event, props.row.original.id)}}/>
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: (cellProps: CellProps<CustomRow, string>) => <DeleteModalWindow value={cellProps.cell.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {() => {deleteObject(cellProps.cell.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}

export const ColumnsEventTable = (
    props: {entity: string},
    setData: (value: (((prevState: any[]) => any[]) | any[])) => void,
    deleteObject: (
        id: number,
        entity: string,
        setData: (value: (((prevState: any[]) => any[]) | any[])) => void) => void): any[] => {
        const columns = React.useMemo(
        () => [
            {
                Header: "id",
                accessor: "id",
                Cell: (props: CellProps<CustomRow, number>) => <a href={'/admin/event/' + props.cell.value}> {props.cell.value} </a>
            },
            {
                Header: "Заголовок",
                accessor: "title",
            },
            {
                Header: "Категория",
                accessor: "category",
            },
            {
                Header: "Автор",
                accessor: "author",
                Cell: (props: CellProps<CustomRow, string>) =><a href={'/profile/' + props.cell.value}> {props.cell.value} </a>
            },
            {
                Header: "Время начала",
                accessor: "datetime",
            },
            {
                Header: "Город",
                accessor: "town",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-"
            },
            {
                Header: "Время создания",
                accessor: "dateCreated",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-"
            },
            {
                Header: "Описание",
                accessor: "description",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-"
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: (cellProps: CellProps<CustomRow, number>) => <DeleteModalWindow value={cellProps.cell.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {() => {deleteObject(cellProps.cell.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}

export const ColumnsRequestTable = (
    props: {entity: string},
    setData: (value: (((prevState: any[]) => any[]) | any[])) => void,
    deleteObject: (
        id: number,
        entity: string,
        setData: (value: (((prevState: any[]) => any[]) | any[])) => void) => void): any[] => {
    const columns = React.useMemo(
        () => [
            {
                Header: "Id ивента",
                accessor: "event",
            },
            {
                Header: "Подписчик",
                accessor: "user",
                Cell: (props: CellProps<CustomRow, string>) => <a href={'/profile/' + props.cell.value}> {props.cell.value} </a>
            },
            {
                Header: "Автор ивента",
                accessor: "author",
                Cell: (props: CellProps<CustomRow, string>) =><a href={'/profile/' + props.cell.value}> {props.cell.value} </a>
            },
            {
                Header: "Время создания",
                accessor: "dateCreated",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-"
            },
            {
                Header: "Статус",
                accessor: "status",
                Cell: (props: CellProps<CustomRow, string>) => props.cell.value || "-"
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: (cellProps: CellProps<CustomRow, number>) => <DeleteModalWindow value={cellProps.cell.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {() => {deleteObject(cellProps.cell.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}