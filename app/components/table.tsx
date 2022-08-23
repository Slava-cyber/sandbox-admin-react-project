import React, {Dispatch, SetStateAction} from 'react';
import {useTable, useSortBy, useFilters, Row, FilterValue} from 'react-table';
import { useGlobalFilter, usePagination} from 'react-table'

interface globalFilterProps {
    preGlobalFilteredRows : Row[],
    globalFilter: any,
    setGlobalFilter : (filterValue: FilterValue) => void
}

  function GlobalFilter(props: globalFilterProps): JSX.Element {
    const count = props.preGlobalFilteredRows.length
    const [value, setValue]: FilterValue = React.useState(props.globalFilter)
    const onChange = (value : FilterValue) => {
        props.setGlobalFilter(value || undefined)
    };

    return (
        <div className={"row"}>
        <div className={"col-md-6"}>
            <div className={"row align-items-center"}>
                <div className={"col-md-2 text-end p-2"}>
                            <span className={"align-middle"}>
                                    Поиск:{' '}
                            </span>
                </div>
                <div className={"col-md-10 align-items-center"}>
                    <div className={"form-group"}>
                        <input className={"form-control"}
                               value={value || ""}
                               onChange={e => {
                                   setValue(e.target.value);
                                   onChange(e.target.value);
                               }}
                               placeholder={`${count} records...`}
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

function Table({columns, data}: any) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
    } = useTable (
        {
            columns,
            data,
        },
        //useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <>
        <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
        />
            <div className={"row"}>
        <div className={"col-md-12"}>
            <div className={"table-responsive"}>
                <table className={"table table-hover align-middle text-center mt-3"} {...getTableProps()} border={1}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps([
                                    {style: {minWidth: column.minWidth, width: column.width}},
                                    column.getSortByToggleProps()
                                ])}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps({
                                        style: {minWidth: cell.minWidth}
                                    })}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-12 px-0"}>
                    <ul className="pagination mb-3 justify-content-center align-items-center">

                        <li className={"page-link"} onClick={() => gotoPage(0)}>
                            {'<<'}
                        </li>{' '}
                        <li className={"page-link"} onClick={() => previousPage()}>
                            {'<'}
                        </li>{' '}
                        <li className={"page-link"} onClick={() => nextPage()}>
                            {'>'}
                        </li>{' '}
                        <li className={"page-link"} onClick={() => gotoPage(pageCount - 1)}>
                            {'>>'}
                        </li>{' '}
                        <li className={"mx-3"}>
                        <span>
                            <strong>
                                {state.pageIndex + 1} из {pageOptions.length}
                            </strong>{' '}
                        </span>
                        </li>
                        <li className={""}>
                        <select
                            value={state.pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {[2, 5, 10, 20].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Показать {pageSize}
                                </option>
                            ))}
                        </select>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Table;