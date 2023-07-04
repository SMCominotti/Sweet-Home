import Favorites from "../../models/schemas/favorites.js";
import Product from "../../models/schemas/product.js";
import User from "../../models/schemas/user.js";

export default async (req, res) => {
  try {
    const { user, products } = req.body;
    const { product, quantity } = products[0];

    const productObj = await Product.findById(product);
    const userObj = await User.findOne({ uid: user });
    const favorites = await Favorites.findOne({ user: userObj });

    if (!productObj) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (!userObj) {
      return res.status(400).json({ message: "User not found" });
    }
    const userId = userObj.uid || userObj._id;

    if (!favorites) {
      const quantityToAdd = parseInt(quantity);

      if (isNaN(quantityToAdd) || quantityToAdd < 1) {
        return res.status(400).json({ message: "Invalid quantity provided" });
      }

      const newFavorites = new Favorites({
        user: userObj._id,
        products: [{ product: productObj._id, quantity: quantityToAdd }],
      });

      userObj.favorites.push(newFavorites);
      await userObj.save();

      productObj.inFavorites = true;
      await productObj.save();

      await newFavorites.save();

      return res.json({ message: "Product added to favorites", favorites: newFavorites });
    }

    const productInFavoritesIndex = favorites.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (productInFavoritesIndex === -1) {
      const quantityToAdd = parseInt(quantity);

      if (isNaN(quantityToAdd) || quantityToAdd < 1) {
        return res.status(400).json({ message: "Invalid quantity provided" });
      }

      favorites.products.push({ product: productObj._id, quantity: quantityToAdd });
    } else {
      const quantityToAdd = parseInt(quantity);

      if (isNaN(quantityToAdd) || quantityToAdd < 1) {
        return res.status(400).json({ message: "Invalid quantity provided" });
      }

      const selectedProduct = favorites.products[productInFavoritesIndex];
      selectedProduct.quantity += quantityToAdd;
    }

    await favorites.save();

    productObj.inFavorites = true;
    await productObj.save();

    return res.json({ message: "Product added to favorites", favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
