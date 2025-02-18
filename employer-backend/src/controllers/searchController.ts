import { Request, Response } from "express";
import { searchEmployees } from "../services/searchService";

export const fetchSearchedEmployees = (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const employees = searchEmployees(search as string);

        if (employees.length === 0) {
            res.status(404).json({
                message: "No employees found",
                data: [],
            });
        }

        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    } catch (error) {
        console.error(" Error fetching employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
