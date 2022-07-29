import React, { useEffect , useState} from 'react';
import Table from './table.jsx';
import {getData} from './tablefunction.jsx';
import {deleteObject} from './tablefunction.jsx';
import {ColumnsRequestTable} from './tablefunction.jsx';

function RequestTable(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData(props.entity)
            .then(
                response => setData(response)
            );
    }, []);

    const columns = ColumnsRequestTable(props, setData, deleteObject);

    return (
        <>
            <h6>Requests table</h6>
            <div>
                <Table columns={columns} data={data} />
            </div>
        </>
    );
}

export default RequestTable;