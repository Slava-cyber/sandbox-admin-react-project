import React, { useEffect , useState} from 'react';
import Table from './table.jsx';

function RequestTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/requestApiRequest', {
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
        ],
        []
    );

    return (
        <>
            <h6>Events table</h6>
            <div>
                <Table columns={columns} data={data} />
            </div>
        </>
    );
}

export default RequestTable;