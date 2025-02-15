import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FETCH_COMPANY_REQUEST } from "../redux/actions/companyActions";

const Company = () => {
  const dispatch = useDispatch();
  const company = useSelector((state: RootState) => state.company.data);
  const isLoading = useSelector((state: RootState) => state.company.isLoading);
  const error = useSelector((state: RootState) => state.company.error);

  useEffect(() => {
    dispatch(FETCH_COMPANY_REQUEST());
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const companyInfo = company?.companyInfo;
  const employees = company?.employees ?? [];

  if (!companyInfo) {
    return <p>No Company Info</p>;
  }

  const { companyName, companyMotto, companyEst } = companyInfo;

  return (
    <div>
      <h1>Employer Application</h1>

      {companyInfo ? (
        <>
          <div>
            <h2>{companyName}</h2>
            <p>
              <strong>Motto:</strong> {companyMotto}
            </p>
            <p>
              <strong>Established:</strong>
              {new Date(companyEst).toLocaleDateString()}
            </p>
          </div>

          <h2>Employees</h2>
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                <img
                  src={employee.avatar}
                  alt={employee.firstName}
                  width="50"
                />
                <p>
                  <strong>
                    {employee.firstName} {employee.lastName}
                  </strong>
                  - {employee.jobTitle}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default Company;
