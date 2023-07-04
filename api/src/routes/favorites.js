import { Router } from "express";

// ? Controllers 
import getFavorites from "../controllers/favorites/getFavorites.js"
import postFavorites from "../controllers/favorites/postFavorites.js";
import deleteFavorites from "../controllers/favorites/deleteProductFavoriteById.js";
import getFavoritesById from "../controllers/favorites/getFavoritesById.js";


const router = Router();

//? Rutas .get
router.get("/favorites", getFavorites);
router.get("/favorites/:id", getFavoritesById)


//? Ruta .post
router.post("/favorites", postFavorites);

//? Ruta .delete
router.delete("/favorites/:favoritesId", deleteFavorites);


export default router;