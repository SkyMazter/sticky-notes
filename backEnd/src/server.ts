import express, { Request, Response } from "express";
import cors from "cors";

//database connection
import { createConnection } from "mysql2/promise";

const app: express.Application = express();
const port = 3001;
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:4173"],
};

//middleware
app.use(express.json());
app.use(cors(options));

async function connectToDatabase() {
  const connection = await createConnection({
    host: "localhost", // or '127.0.0.1' if localhost doesn’t work
    port: 3306,
    user: "root",
    password: "rootdb@server",
    database: "database",
  });

  console.log("Connected to the database!");
  return connection;
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
  connectToDatabase().catch((err) => {
    console.error("Database connection failed:", err);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase().catch((err) => {
    console.error("Database connection failed:", err);
  });
});
