import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import companyRoutes from "./routes/companyRoutes";
import searchRoutes from "./routes/searchRoutes";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/company", companyRoutes);
app.use("/api/employee", searchRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});