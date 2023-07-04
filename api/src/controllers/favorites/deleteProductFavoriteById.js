import Favorites from "../../models/schemas/favorites.js";
import User from "../../models/schemas/user.js";

export default async (req, res) => {
  const { favoriteId } = req.params;

  try {
    const favorites = await Favorites.findByIdAndDelete(favoriteId);

    if (!favorites) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await User.findOneAndUpdate(
      { favorites: favoriteId },
      { $pull: { favorites: favoriteId } },
      { new: true }
    );

    res.status(200).send({ message: "Favorite deleted successfully", favorites });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
