import { model, Schema } from "mongoose";

export const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
