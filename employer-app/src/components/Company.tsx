import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "./Card";
import useDebounceResize from "../hooks/useDebounceResize";

const Company = () => {
  const company = useSelector((state: RootState) => state.company.data);
  const isLoading = useSelector((state: RootState) => state.company.isLoading);
  const error = useSelector((state: RootState) => state.company.error);
  const isMobile = useDebounceResize(300);

  if (isLoading) {
    return <div className="loading">...loading</div>;
  }

  if (error) {
    return <div className="error">Error on Employees data</div>;
  }

  const employees = company?.employees ?? [];

  return (
    <>
      <div className="data-count">
        <span>Showing 10 of 500</span>
      </div>
      <div className="table-container">
        {!isMobile && (
          <div className="table-header">
            <div className="header-column first-col">
              <span>ID</span>

              {/* <span className="order-arrow">
                <span>&#9650;</span>
                <span>&#9660;</span>
              </span> */}
            </div>
            <div className="header-column second-col">Name</div>
            <div className="header-column third-col">Contact No</div>
            <div className="header-column fourth-col">Address</div>
          </div>
        )}

        <div className="table-body">
          {employees && employees.length > 0 ? (
            employees.map((employee) => (
              <div className="table-row" key={employee.id}>
                <Card employee={employee} />
              </div>
            ))
          ) : (
            <p className="no-data">No Data</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Company;
