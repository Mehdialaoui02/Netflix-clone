import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

dotenv.config();
app.use('/api/v1/auth', authRoutes)
const PORT = ENV_VARS.PORT


console.log("MONGO_URI", process.env.MONGO_URI)
app.listen(PORT, () => {
  console.log("Server started at http://localhost::" + PORT);
  connectDB();
}) 