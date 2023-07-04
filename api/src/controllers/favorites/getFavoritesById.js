import Favorites from "../../models/schemas/favorites.js";

export default async (req, res) => {
  try {
    const { id } = req.params;
    const favorites = await Favorites.findById(id)

    if (!favorites) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
