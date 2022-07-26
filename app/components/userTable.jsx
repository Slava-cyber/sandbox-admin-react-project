import React, { useEffect , useState} from 'react';
import Table from './table.jsx';

function UserTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/userApiRequest', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'giveData':'give'}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}})
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "id",
                accessor: "id",
            },
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