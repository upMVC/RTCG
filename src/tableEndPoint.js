import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Table } from 'react-bootstrap';

const GeneratedTable = () => {
  const columns = React.useMemo(() => [
    {
      Header: 'name',
      accessor: 'name',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
    {
      Header: 'password',
      accessor: 'password',
    },
  ], []);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from mock endpoint
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => {
        setData(data); // This will update the state once with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this runs only once

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Table
      {...getTableProps()}
      responsive
      striped={true}
      bordered={true}
      hover={true}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id} // Pass key directly
            style={{ backgroundColor: '#b4d3f3' }}
          >
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id} style={{ backgroundColor: '#d9f0c7' }}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.id}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default GeneratedTable;
