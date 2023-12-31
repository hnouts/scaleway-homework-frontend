import React, { useEffect, useState } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { useNavigate } from "react-router-dom";
import { getServers } from "../../services/Server.service";
import Server from "../../interfaces/Server";
import Loading from "../Loading/Loading";
import styles from "./ServerList.module.css";

const ServerList: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getServers();
      if (data !== null) {
        setTimeout(() => {
          setServers(data);
          setLoading(false);
        }, 500);
      } else {
        console.log('Error getting server data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: Array<Column<Server>> = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "ID",
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Type",
        accessor: "Type",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: servers }, useSortBy);

  const handleRowClick = (row: Server) => {
    navigate(`/server/${row.ID}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h2>Server List</h2>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.header}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className={styles.cell}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServerList;
