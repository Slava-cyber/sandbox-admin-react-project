import React, {useMemo} from 'react';

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
                console.log('data');
                resolve(data);
            });
    })
}

export const deleteObject = (id, entity, setData) => {
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
                        response => setData(response)
                    );
            }
        });
}

export const ColumnsUserTable = (props, setData, deleteObject) => {
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
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: e=> <button className="btn btn-link" onClick={function () {deleteObject(e.value, props.entity, setData)}}>
                    удалить</button>
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
                Cell: e=> <button className="btn btn-link" onClick={function () {deleteObject(e.value, props.entity, setData)}}>
                    удалить</button>
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
                Cell: e=> <button className="btn btn-link" onClick={function () {deleteObject(e.value, props.entity, setData)}}>
                    удалить</button>
            },
        ],
        []
    );
    return columns;
}