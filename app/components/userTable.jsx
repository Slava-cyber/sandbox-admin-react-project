import React, { useEffect , useState} from 'react';
import Table from './table.jsx';

function UserTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
            .then(
                response => setData(response)
            );
    }, []);

    function deleteObject(id) {
        console.log(id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify (
                {
                    'entityType': 'user',
                    'id': id
                }
            )
        };
        fetch('/userApiDelete', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data['status']) {
                    getData()
                        .then(
                            response => setData(response)
                        );
                }
            });
    }

    function getData() {
        return new Promise(function(resolve, reject) {
            fetch('/userApiRequest', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({'giveData': 'give'}),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            })
                .then(response => response.json())
                .then((data) => {
                    resolve(data);
                });
        })
    }

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
            },
            {
                Header: "",
                id:'delete',
                accessor: "id",
                Cell: e=> <button className="col-5" onClick={function () {deleteObject(e.value)}}>delete</button>
            },

        ],
        []
    );

    return (
        <>
            <h6>Users table</h6>
            <div>
                <Table columns={columns} data={data} />
            </div>
        </>
    );
}

export default UserTable;