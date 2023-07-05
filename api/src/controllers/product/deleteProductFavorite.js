import User from "../../models/schemas/user.js";

const deleteProductFavorite = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: productId } },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Producto eliminado de los favoritos" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export default deleteProductFavorite;
