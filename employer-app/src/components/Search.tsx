const Search = () => {
  return (
    <div className="search">
      <label className="screen-reader-only" htmlFor="search-input">
        Search
      </label>
      <input
        type="text"
        id="search-input"
        className="search-input"
        name="search"
        placeholder="Enter the name"
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </div>
  );
};

export default Search;
