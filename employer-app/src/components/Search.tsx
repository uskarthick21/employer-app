import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SEARCH_EMPLOYEES_REQUEST,
  SEARCH_RESET,
} from "../redux/actions/searchActions";
import { FETCH_COMPANY_REQUEST } from "../redux/actions/companyActions";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(SEARCH_EMPLOYEES_REQUEST(searchTerm));
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    dispatch(SEARCH_RESET());
    dispatch(FETCH_COMPANY_REQUEST());
  };

  return (
    <div data-testid="search">
      <form className="search" onSubmit={handleSubmit}>
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
        <button aria-label="Submit" className="btn btn-primary" type="submit">
          Submit
        </button>
        <button
          aria-label="Reset"
          onClick={handleReset}
          className="btn btn-primary"
          type="button"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Search;
