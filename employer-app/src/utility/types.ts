
export interface CompanyInfo {
    companyName: string;
    companyMotto: string;
    companyEst: string;
}

export interface Employee {
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

export interface CompanyDataResponse {
    companyInfo: CompanyInfo;
    employees: Employee[];
}

export interface CompanyState {
    data: CompanyDataResponse | null;
    isLoading: boolean;
    error: string | null;
}