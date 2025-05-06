import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMySupplyshedRequest = [
  body("shedName").notEmpty().withMessage("Shed name is required"),

  body("city").notEmpty().withMessage("City is required"),

  body("country").notEmpty().withMessage("Country is required"),

  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),

  body("categoriesStored")
    .isArray()
    .withMessage("Categories stored must be an array")
    .notEmpty()
    .withMessage("Categories array cannot be empty"),

  body("supplies").isArray().withMessage("Supplies must be an array"),

  body("supplies.*.name")
    .notEmpty()
    .withMessage("Supply item name is required"),

  body("supplies.*.quantity")
    .isFloat({ min: 0 })
    .withMessage("Supply item quantity must be a positive number"),

  body("supplies.*.unit")
    .notEmpty()
    .withMessage("Supply item unit is required"),

  body("supplies.*.category")
    .notEmpty()
    .withMessage("Supply item category is required"),

    body("supplies.*.expiryDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Expiry date must be a valid ISO8601 date string"),  

  handleValidationErrors,
];
