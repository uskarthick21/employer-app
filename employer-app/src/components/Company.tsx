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
