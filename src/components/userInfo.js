import React, { Fragment, useState } from "react";
import usePagination from "./usePagination";

const UserInfo = ({ data, itemsPerPage, startFrom, searchByData }) => {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(
    searchByData && searchByData.length > 0 ? searchByData[0].value : ""
  );
  const [searchFor, setSearchFor] = useState("");
  const [sortByKey, setSortByKey] = useState("name");
  const [order, setOrder] = useState("asc");
  const columns = [
    { label: "ID", sortKey: "id" },
    { label: "USERNAME", sortKey: "username" },
    { label: "FIRST NAME", sortKey: "first_name" },
    { label: "LAST NAME", sortKey: "last_name" },
    { label: "EMAIL", sortKey: "email" },
    { label: "GENDER", sortKey: "gender" },
    { label: "DOB", sortKey: "dob" },
    { label: "COUNTRY", sortKey: "country" },
  ];
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching,
    filteredData,
    setChangePerPageRecord,
  } = usePagination({ itemsPerPage, data, startFrom });

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setSearching(true);
      const copiedData = [...data];
      const filtered = copiedData.filter((country) => {
        let searchKey = "name";
        if (searchByData && searchByData.length > 0) {
          searchKey = searchBy;
        }
        return country[searchKey]
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      });
      const copyOfFilteredData = [...filtered];
      const sortFiltered = sortData(copyOfFilteredData, sortByKey, order);
      setFilteredData(sortFiltered);
    } else {
      const sortFiltered = sortData(data, sortByKey, order);
      setFilteredData(sortFiltered);
    }
    setSearchFor(search);
  };

  const sortHandler = (sortBy, orderBy) => {
    if (sortByKey !== sortBy) {
      setSortByKey(sortBy);
    }
    if (order !== orderBy) {
      setOrder(orderBy);
    }

    const copyOfFilteredData = [...filteredData];
    const filtered = sortData(copyOfFilteredData, sortBy, orderBy);
    setFilteredData(filtered);
  };

  const sortData = (dataToSort, sortBy, orderBy) => {
    const filtered = dataToSort.sort((a, b) => {
      if (orderBy === "asc") {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        } else if (a[sortBy] > b[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (b[sortBy] < a[sortBy]) {
          return -1;
        } else if (b[sortBy] > a[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return filtered;
  };

  return (
    <div className="wrapper">
      <form
        onSubmit={submitHandler}
        className="mt-3 mb-3 is-flex"
        style={{ justifyContent: "center" }}
      >
        <div className="select mr-2">
          {/* value={searchBy} */}
          <select
            onChange={(e) => {
              setChangePerPageRecord(e.target.value);
            }}
          >
            {/* {searchByData.map((data, index) => ( */}
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            {/* ))} */}
          </select>
        </div>
        {searchByData && searchByData.length > 0 && (
          <div className="select mr-2">
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              {searchByData.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="field mr-2">
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="button is-link">
          Search
        </button>
      </form>
      {searchFor && (
        <h2 className="mb-6 has-text-centered is-size-2">
          Search results for: "{searchFor}"
        </h2>
      )}
      {slicedData.length > 0 ? (
        <Fragment>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      sortHandler(
                        col.sortKey,
                        sortByKey === col.sortKey
                          ? order === "asc"
                            ? "desc"
                            : "asc"
                          : "asc"
                      )
                    }
                  >
                    {col.label}
                    {sortByKey === col.sortKey && (
                      <span className="icon">
                        {order === "asc" ? (
                          <i className="fas fa-sort-up"></i>
                        ) : (
                          <i className="fas fa-sort-down"></i>
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.dob}</td>
                  <td>{item.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="pagination">
            <a href="/#" className="pagination-previous" onClick={prevPage}>
              Previous
            </a>
            <a href="/#" className="pagination-next" onClick={nextPage}>
              Next
            </a>
            <ul className="pagination-list">
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <li key={page.id}>
                      <a
                        href="/#"
                        className={
                          page.current
                            ? "pagination-link is-current"
                            : "pagination-link"
                        }
                        onClick={(e) => changePage(page.id, e)}
                      >
                        {page.id}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li key={page.id}>
                      <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </Fragment>
      ) : (
        <div className="message is-link">
          <div className="message-body has-text-centered">No results</div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
