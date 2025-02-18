import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "./Card";
import useDebounceResize from "../hooks/useDebounceResize";

const Company = () => {
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
                <a className="down" title="sort for aescending order" href="#">
                  &#9660;
                </a>
                <a className="up" title="sort for desending order" href="#">
                  &#9650;
                </a>
              </span>
            </div>
            <div className="header-column second-col">
              <span>Name</span>
              <span className="order-arrow">
                <a className="down" title="sort for aescending order" href="#">
                  &#9660;
                </a>
                <a className="up" title="sort for desending order" href="#">
                  &#9650;
                </a>
              </span>
            </div>
            <div className="header-column third-col">
              <span>Contact No</span>
              <span className="order-arrow">
                <a className="down" title="sort for aescending order" href="#">
                  &#9660;
                </a>
                <a className="up" title="sort for desending order" href="#">
                  &#9650;
                </a>
              </span>
            </div>
            <div className="header-column fourth-col">
              <span>Address</span>
              <span className="order-arrow">
                <a className="down" title="sort for aescending order" href="#">
                  &#9660;
                </a>
                <a className="up" title="sort for desending order" href="#">
                  &#9650;
                </a>
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
    </>
  );
};

export default Company;
