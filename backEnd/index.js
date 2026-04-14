
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import convertRoutes from "./routes/convertRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/convert", convertRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});