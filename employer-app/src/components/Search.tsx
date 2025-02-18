import { useState } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_EMPLOYEES_REQUEST } from "../redux/actions/searchActions";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(SEARCH_EMPLOYEES_REQUEST(searchTerm));
    }
  };

  return (
    <div data-testid="search" className="search">
      <form onSubmit={handleSubmit}>
        <label className="screen-reader-only" htmlFor="search-input">
          Search
        </label>
        <input
          type="text"
          id="search-input"
          className="search-input"
          name="search"
          placeholder="Search by ID, Name, Contact No, or Address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
