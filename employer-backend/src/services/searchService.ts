import sampleData from "../data/sampleData.json";
import { Employee, SampleData } from "../utility/types";

// Explicitly type the imported JSON data. If not it throw error. Because i am trying to access data.employee and typescript doesn't automatically infer the structure of the JSON file
const data: SampleData = sampleData;
const employees: Employee[] = data.employees;

export const searchEmployees = (searchTerm?: string): Employee[] => {
    if (!searchTerm) return employees;

    const searchLower = searchTerm.toLowerCase();

    return employees.filter(
        (emp) =>
            emp.firstName.toLowerCase().includes(searchLower) ||
            emp.lastName.toLowerCase().includes(searchLower) ||
            emp.contactNo.includes(searchLower) ||
            emp.address.toLowerCase().includes(searchLower)
    );
};
