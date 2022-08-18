import React, {useMemo, useState} from 'react';

import Select from "../htmlBlocks/select";
import DeleteModalWindow from "../htmlBlocks/modalWindow";
import FetchRequest from "./fetchRequest";

export const getData = (entity) => {
    return new Promise(function(resolve, reject) {
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

export const deleteObject = (id, entity, setData) => {
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
                        response => {
                            setData(response)
                        }
                    );
            }
        });
}

export const changeRole = (event, id) => {
    FetchRequest(
        JSON.stringify (
            {
                'role': event.target.value,
                'id': id
            }),
        "POST",
        '/userChangeRole')
        .then(response => response.json())
        .then((data) => {
        });
}

export const ColumnsUserTable = (props, setData, deleteObject) => {
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
                Cell: e =><a href={'/profile/' + e.value}> {e.value} </a>
            },
            {
                Header: "Email",
                accessor: "email",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "Время Регистрации",
                accessor: "dateCreated",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "Аватар",
                accessor: "avatar",
                Cell: e => <img className="rounded-circle image-admin"
                                src={e.value ? e.value : "/images/system/avatar_null.jpg"}/>
            },
            {
                Header: "Дата рождения",
                accessor: "dateOfBirth",
            },
            {
                Header: "Город",
                accessor: "town",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Рейтинг",
                accessor: "rating",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Количество отзывов",
                accessor: "numberOfReviews",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Роль",
                accessor: "role",
                minWidth: 200,
                Cell: e => <Select options = {options} id={"role"} selected={e.value}
                                 change = {(event) => {changeRole(event, e.row.original.id)}}/>
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: e => <DeleteModalWindow value={e.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {(event) => {deleteObject(e.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}

export const ColumnsEventTable = (props, setData, deleteObject) => {
        const columns = React.useMemo(
        () => [
            {
                Header: "id",
                accessor: "id",
                Cell: e =><a href={'/admin/event/' + e.value}> {e.value} </a>
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
                Cell: e =><a href={'/profile/' + e.value}> {e.value} </a>
            },
            {
                Header: "Время начала",
                accessor: "datetime",
            },
            {
                Header: "Город",
                accessor: "town",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Время создания",
                accessor: "dateCreated",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Описание",
                accessor: "description",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: e => <DeleteModalWindow value={e.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {(event) => {deleteObject(e.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}

export const ColumnsRequestTable = (props, setData, deleteObject) => {
    const columns = React.useMemo(
        () => [
            {
                Header: "Id ивента",
                accessor: "event",
            },
            {
                Header: "Подписчик",
                accessor: "user",
                Cell: e =><a href={'/profile/' + e.value}> {e.value} </a>
            },
            {
                Header: "Автор ивента",
                accessor: "author",
                Cell: e =><a href={'/profile/' + e.value}> {e.value} </a>
            },
            {
                Header: "Время создания",
                accessor: "dateCreated",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "Статус",
                accessor: "status",
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: e => <DeleteModalWindow value={e.value} sourceTitle={"Удалить"}
                                              body={"Вы уверены, что хотите удалить запись в таблице?"}
                                              delete = {(event) => {deleteObject(e.value, props.entity, setData)}}/>
            },
        ],
        []
    );
    return columns;
}