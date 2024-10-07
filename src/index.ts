import express, { Request, Response } from 'express';
import "dotenv/config"
import { authRoutes } from './routes/authRoutes';
import cors from "cors"
const app = express();
const PORT = Number(process.env.PORT) || 8080;
const host = '192.168.1.8'

// CORS
app.use(cors())

// Middleware to parse JSON requests
app.use(express.json());

// Add your routes here
app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello, World!" });
})
// Auth Routes
app.use("/api", authRoutes)

// Start the server
app.listen(PORT, host, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
