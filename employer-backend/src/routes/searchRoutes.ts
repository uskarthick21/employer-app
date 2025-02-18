import express from "express";
import { fetchSearchedEmployees } from "../controllers/searchController";

const router = express.Router();

router.get("/", fetchSearchedEmployees);

export default router;
