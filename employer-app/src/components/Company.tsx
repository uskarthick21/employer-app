import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "./Card";
import useDebounceResize from "../hooks/useDebounceResize";
import { setSortField } from "../redux/slice/sort/sortSlice";
import Pagination from "./Pagination";

const Company = () => {
  const dispatch = useDispatch();

  // Fetch company data
  const company = useSelector((state: RootState) => state.company.data);
  const isCompanyLoading = useSelector(
    (state: RootState) => state.company.isLoading
  );
  const companyError = useSelector((state: RootState) => state.company.error);

  // Fetch search data
  const search = useSelector((state: RootState) => state.search.data);
  const isSearchLoading = useSelector(
    (state: RootState) => state.search.isLoading
  );
  const searchError = useSelector((state: RootState) => state.search.error);

  // Fetch sorting state
  const { field: sortField, order: sortOrder } = useSelector(
    (state: RootState) => state.sort
  );

  // Error Handle
  const errorMessage = searchError || companyError;

  // Show employees count
  const totalEmployees = company?.employees?.length ?? 0;
  const displayEmployees = search.length > 0 ? search.length : totalEmployees;

  // Responsive check
  const isMobile = useDebounceResize(300);

  //Handle which data to display
  let employees = company?.employees ?? [];
  if (search.length > 0) {
    employees = search;
  }

  // Apply sorting if a field is selected
  if (sortField) {
    employees = [...employees].sort((a, b) => {
      // TypeScript does not allow a[sortField] directly because it doesn't know if sortField is a valid key.
      // To fix this, we tell TypeScript that sortField is a valid key using:
      // sortField as "keyof typeof" a
      const valueA = a[sortField as keyof typeof a]; // a["firstName"] = "saravanan"
      const valueB = b[sortField as keyof typeof b]; // b["firstName"] = "karthick"

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
  }

  const handleSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSortField({ field, order }));
  };

  //Loading State
  if (isCompanyLoading || isSearchLoading) {
    return <div className="loading">Loading employees...</div>;
  }

  // Error State
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }

  return (
    <>
      <div className="data-count">
        <span>{`Showing ${displayEmployees} of ${totalEmployees}`}</span>
      </div>
      <div className="table-container">
        {!isMobile && (
          <div className="table-header">
            <div className="header-column first-col">
              <span>ID</span>
              <span className="order-arrow">
                <button
                  className="down"
                  title="Sort in ascending order"
                  onClick={() => handleSort("id", "asc")}
                >
                  &#9660;
                </button>
                <button
                  className="up"
                  title="Sort in descending order"
                  onClick={() => handleSort("id", "desc")}
                >
                  &#9650;
                </button>
              </span>
            </div>
            <div className="header-column second-col">
              <span>Name</span>
              <span className="order-arrow">
                <button
                  className="down"
                  title="Sort in ascending order"
                  onClick={() => handleSort("firstName", "asc")}
                >
                  &#9660;
                </button>
                <button
                  className="up"
                  title="Sort in descending order"
                  onClick={() => handleSort("firstName", "desc")}
                >
                  &#9650;
                </button>
              </span>
            </div>
            <div className="header-column third-col">
              <span>Contact No</span>
              <span className="order-arrow">
                <button
                  className="down"
                  title="Sort in ascending order"
                  onClick={() => handleSort("contactNo", "asc")}
                >
                  &#9660;
                </button>
                <button
                  className="up"
                  title="Sort in descending order"
                  onClick={() => handleSort("contactNo", "desc")}
                >
                  &#9650;
                </button>
              </span>
            </div>
            <div className="header-column fourth-col">
              <span>Address</span>
              <span className="order-arrow">
                <button
                  className="down"
                  title="Sort in ascending order"
                  onClick={() => handleSort("address", "asc")}
                >
                  &#9660;
                </button>
                <button
                  className="up"
                  title="Sort in descending order"
                  onClick={() => handleSort("address", "desc")}
                >
                  &#9650;
                </button>
              </span>
            </div>
          </div>
        )}

        <div className="table-body">
          {employees.map((employee) => (
            <div className="table-row" key={employee.id}>
              <Card employee={employee} />
            </div>
          ))}
        </div>
      </div>
      {employees.length > 0 && <Pagination />}
    </>
  );
};

export default Company;
