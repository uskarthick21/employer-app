import axios from "axios";
import { useState, useEffect } from "react";

interface CompanyInfo {
  companyName: string;
  companyMotto: string;
  companyEst: string;
}

interface Employee {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  contactNo: number;
  address: string;
  age: number;
  bio: string;
  dateJoined: string;
}

interface CompanyDataResponse {
  companyInfo: CompanyInfo;
  employees: Employee[];
}

const Company = () => {
  const [companyData, setCompanyData] = useState<CompanyDataResponse | null>(
    null
  );

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get<CompanyDataResponse>(
        "http://localhost:5000/api/company"
      );

      setCompanyData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div>
      <h1>Employer Application</h1>

      {companyData ? (
        <>
          <div>
            <h2>{companyData.companyInfo.companyName}</h2>
            <p>
              <strong>Motto:</strong> {companyData.companyInfo.companyMotto}
            </p>
            <p>
              <strong>Established:</strong>{" "}
              {new Date(
                companyData.companyInfo.companyEst
              ).toLocaleDateString()}
            </p>
          </div>

          <h2>Employees</h2>
          <ul>
            {companyData.employees.map((employee) => (
              <li key={employee.id}>
                <img
                  src={employee.avatar}
                  alt={employee.firstName}
                  width="50"
                />
                <p>
                  <strong>
                    {employee.firstName} {employee.lastName}
                  </strong>{" "}
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
