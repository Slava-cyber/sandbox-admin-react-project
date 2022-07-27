import React, { useEffect , useState} from 'react';
import Table from './table.jsx';

function EventTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/eventApiRequest', {
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

export default EventTable;