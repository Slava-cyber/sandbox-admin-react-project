import React, { useEffect , useState} from 'react';
import Table from './table.jsx';
import {getData} from './tablefunction.jsx';
import {deleteObject} from './tablefunction.jsx';
import {ColumnsEventTable} from './tablefunction.jsx';

function EventTable(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData(props.entity)
            .then(
                response => setData(response)
            );
    }, []);

    const columns = ColumnsEventTable(props, setData, deleteObject);

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