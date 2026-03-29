import authRoutes from "./src/routes/authRoutes.js"
import connectDB from './src/config/db.js'
import dotenv from "dotenv"
import express from 'express'
import cors from "cors"
import propertyRoutes from "./src/routes/propertyRoutes.js"
import { protect } from "./src/middleware/authMiddleware.js"


dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const port = process.env.PORT;

try {
  await connectDB();

  app.use("/api/auth", authRoutes);
  app.use(protect);
  app.use("/api/property", propertyRoutes);

  app.get('/health-check', (req, res) => {
    res.json({
      message: "Hello world"
    })
  })

  app.listen(port, () => {
    console.log(`TechKraft Buyer Portal app listening on http://localhost:${port}`)
  });

} catch (error) {
  console.error("Failed to start server: ", error);
  process.exit(1);
}


