import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'; 
import courseRoutes from './routes/course.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';
import express from 'express';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
//app.use(cors({ origin: [process.env.FRONTEND_URL,'http://localhost:5173/'], credentials: true }));
//app.use(cors({ origin: ['http://localhost:5173/', 'http://localhost:3000/'], credentials: true }));

app.use(cors({
    origin: ['https://frontendforhackathon-2aowlpcgf-harshiths-projects-b45abe4b.vercel.app/', 'https://myproject-2200090170.onrender.com/'],
    credentials: true
  }));
  
  
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/courses', courseRoutes); 
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/', miscellaneousRoutes);
 

app.all('*', (req, res) => {
    res.status(404).send('Server!! Running Successfully');
})

app.use(errorMiddleware);

// db init
connectToDb();

export default app;
