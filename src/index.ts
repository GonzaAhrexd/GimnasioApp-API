// Node.js essential modules
import express from 'express';
import morgan from 'morgan' // HTTP request logger middleware
import cors from 'cors' // CORS module
import dotenv from 'dotenv' // Environment variable module
import cookieParser from 'cookie-parser' // Cookie parsing middleware
import corsOptions from './configs/CorsOptions';
// Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
dotenv.config(); // Load environment variables from .env file

// Start Express application
const app: express.Application = express();

// Set up middlewares
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(cookieParser()); // Use cookie parser middleware
app.use(morgan('dev')); // Use morgan for logging HTTP requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
    
// Define routes
app.use('/api/users', userRoutes)
app.use('/api', authRoutes)

// Start the server
const port = process.env.PORT || 3000; // Server port from environment variables or default to 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
}).on('error', (error: Error) => {
    console.error('Error starting the server:', error);
});