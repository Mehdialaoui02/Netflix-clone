import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'

import { protectRoute } from './middleware/protectRoute.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json());
app.use(cookieParser());

dotenv.config();
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', protectRoute, movieRoutes)
app.use('/api/v1/tv', protectRoute, tvRoutes)


console.log("MONGO_URI", process.env.MONGO_URI)
app.listen(PORT, () => {
  console.log("Server started at http://localhost::" + PORT);
  connectDB();
}) 