import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="" />
        <input
          type="text"
          placeholder="Search Through thousand of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default Search;
