import React, { useState, useEffect } from "react";

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    async function getFetchData() {
      try {
        const res = await fetch(
          `https://1ho0xiq8l4.execute-api.eu-west-1.amazonaws.com/dev/list`
        );
        const data = await res.json();
        if (data) {
          setFetchData(data);
        }
      } catch (err) {
        console.log(`fetch error`, err);
      }
    }
    getFetchData();
  }, []);

  console.log(fetchData);

  function handleChange(e) {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  }

  function clearSearch() {
    setSearchTerm("");
  }

  return (
    <div className="wrapper">
      <h2 className="tabTitle"> Dictionary </h2>
      <input
        placeholder="Search For a Benism..."
        className="searchBar"
        onChange={handleChange}
        value={searchTerm}
        onBlur={clearSearch}
      />
      {fetchData.map((item) => {
        return (
          <>
            <p style={{ fontWeight: "bold" }}> {item.benismName}: </p>
            <p> {item.benismDef}</p>
            <hr style={{ width: "90%" }} />
          </>
        );
      })}
    </div>
  );
}

export default Dictionary;
