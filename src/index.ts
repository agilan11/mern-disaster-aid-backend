import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import MySupplyshedRoute from "./routes/MySupplyshedRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database successfully!"));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express();

app.use(cors({
  origin: 'https://mern-disaster-aid-frontend.onrender.com',
  credentials: true,
}));


app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", MyUserRoute);
app.use("/api/my/supplyshed", MySupplyshedRoute);



app.listen(7000, () => {
    console.log("server started on localhost:7000");
  });