import { Request, Response } from "express";
import Supplyshed from "../models/supplyshed";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMySupplyshed = async (req: Request, res: Response) => {
  try {
    const supplyshed = await Supplyshed.findOne({ user: req.userId });
    if (!supplyshed) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.json(supplyshed);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching Warehouse" });
  }
};


const createMySupplyshed = async (req: Request, res: Response) => {
    try {
      const existingSupplyshed = await Supplyshed.findOne({ user: req.userId });
  
      if (existingSupplyshed) {
        return res
          .status(409)
          .json({ message: "The supply shed already exists" });
      }
  
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
  
      const supplyshed = new Supplyshed(req.body);
      supplyshed.imageUrl = imageUrl;
      supplyshed.user = new mongoose.Types.ObjectId(req.userId);
      supplyshed.lastUpdated = new Date();
      await supplyshed.save();
  
      res.status(201).send(supplyshed);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };

  const updateMySupplyshed = async (req: Request, res: Response) => {
    try {
      const supplyshed = await Supplyshed.findOne({
        user: req.userId,
      });
  
      if (!supplyshed) {
        return res.status(404).json({ message: "warehouse not found" });
      }
  
      supplyshed.shedName = req.body.shedName;
      supplyshed.city = req.body.city;
      supplyshed.country = req.body.country;
      supplyshed.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
      supplyshed.categoriesStored = req.body.categoriesStored;
      supplyshed.supplies = req.body.supplies;
      supplyshed.lastUpdated = new Date();

      if (req.file) {
        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        supplyshed.imageUrl = imageUrl;
      }

  
      await supplyshed.save();
      res.status(200).send(supplyshed);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export default {
    getMySupplyshed,
    createMySupplyshed,
    updateMySupplyshed,
  };