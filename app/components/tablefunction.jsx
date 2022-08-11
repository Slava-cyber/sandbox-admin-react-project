import React, {useMemo, useState} from 'react';

import Select from "./htmlBlocks/select.jsx";
import DeleteModalWindow from "./htmlBlocks/ModalWindow.jsx";

export const getData = (entity) => {
    return new Promise(function(resolve, reject) {
        fetch('/allDataApiRequest', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'entity': entity}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
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
    console.log(id);
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify (
            {
                'entityType': entity,
                'id': id
            }
        )
    };
    fetch('/userApiDelete', requestOptions)
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
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify (
            {
                'role': event.target.value,
                'id': id
            }
        )
    };
    fetch('/userChangeRole', requestOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
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