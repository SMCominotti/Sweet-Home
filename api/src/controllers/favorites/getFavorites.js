import Favorites from "../../models/schemas/favorites.js";

export default async (req, res) => {
  const favorites = await Favorites
    .find()
    .populate("user")
    .populate("products");
    
  if (favorites.length > 0) {
    return res.json(favorites);
  } else {
    return res.status(500).json({ message: "There are no favorites available" });
  }
};