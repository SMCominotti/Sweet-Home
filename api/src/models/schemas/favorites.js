import mongoose from "mongoose";
const { Schema } = mongoose;

const favoritesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, unique: true },
    quantity: { type: Number, default: 1 },
  }],
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

export default Favorites;
