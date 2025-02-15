import { Router } from "express";
import { getCompanyData } from "../controllers/companyController";

const router = Router();

router.get("/", getCompanyData);

export default router;