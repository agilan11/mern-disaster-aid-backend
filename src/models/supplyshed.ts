import mongoose, { InferSchemaType } from "mongoose";

const supplyItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
      },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }, 
    category: { type: String, required: true }, 
    expiryDate: { type: Date }, 
  });

  export type SupplyItemType = InferSchemaType<typeof supplyItemSchema>;
  
  const supplyshedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shedName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    categoriesStored: [{ type: String, required: true }], // e.g., ["Food", "Medicine"]
    supplies: [supplyItemSchema],
    imageUrl: { type: String, required: true }, // optional photo of the location
    lastUpdated: { type: Date, required: true },
  });

  const Supplyshed = mongoose.model("Supplyshed", supplyshedSchema);
  export default Supplyshed;
  