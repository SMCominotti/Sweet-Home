import { Router } from "express";

// Controllers
import getFavorites from "../controllers/favorites/getFavorites.js";
import postFavorites from "../controllers/favorites/postFavorites.js";
import deleteFavorites from "../controllers/favorites/deleteFavorites.js";
import getFavoritesById from "../controllers/favorites/getFavoritesById.js";

const router = Router();

// Rutas GET
router.get("/favorites", getFavorites);
router.get("/favorites/:id", getFavoritesById);

// Ruta POST
router.post("/favorites", postFavorites);

// Ruta DELETE
router.delete("/favorites/:favoriteId", deleteFavorites);

export default router;
