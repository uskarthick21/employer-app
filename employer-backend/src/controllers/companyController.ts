import { Request, Response } from "express";
import companyService from "../services/companyService";

export const getCompanyData = (req: Request, res: Response) => {
    try {
        const data = companyService();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};