import express, { Request, Response } from 'express';
import "dotenv/config"
import { authRoutes } from './routes/authRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const host = '127.0.0.1'

// Middleware to parse JSON requests
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Add your routes here
// Auth Routes
app.use("/api", authRoutes)

// Start the server
app.listen(PORT, host, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
