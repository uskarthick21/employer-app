import { Request, Response } from "express";
import { searchEmployees } from "../services/searchService";

export const fetchSearchedEmployees = (req: Request, res: Response): void => {
    try {
        const { search } = req.query;
        const employees = searchEmployees(search as string);

        if (employees.length === 0) {
            res.status(404).json({
                message: "No employees found",
            });
            return;
        }
        res.status(200).json(employees);
        //throw new Error("Simulated Server Error");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
