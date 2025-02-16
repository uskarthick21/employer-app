import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "./Card";

const Company = () => {
  const company = useSelector((state: RootState) => state.company.data);
  const isLoading = useSelector((state: RootState) => state.company.isLoading);
  const error = useSelector((state: RootState) => state.company.error);

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error on Employees data</div>;
  }

  const employees = company?.employees ?? [];

  return (
    <div className="company">
      {employees ? (
        <>
          {employees.map((employee) => (
            <Card key={employee.id} employee={employee} />
          ))}
        </>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default Company;
