import express from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import MySupplyshedController from "../controllers/MySupplyshedController";
import { validateMySupplyshedRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, //5mb
    },
  });

router.get("/", jwtCheck, jwtParse, MySupplyshedController.getMySupplyshed);


router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  validateMySupplyshedRequest,
  MySupplyshedController.createMySupplyshed
);

router.put(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  validateMySupplyshedRequest,
  MySupplyshedController.updateMySupplyshed
);


  export default router;