import { Router } from "express";

// ? Controllers 

import getAllUsers from "../controllers/user/getAllUsers.js";
import postUser from "../controllers/user/postUser.js";
import getUserById from "../controllers/user/getUserById.js";
import getUserByUid from "../controllers/user/getUserByUid.js";
import deleteUsers from "../controllers/user/deleteUsers.js";
import getUserByEmail from "../controllers/user/getUserByEmail.js";
import putUsers from "../controllers/user/putUsers.js";


const router = Router();


//? Rutas .get
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/v1/:uid", getUserByUid)
router.get("/users/v1/email/:email", getUserByEmail)


//? Ruta .post
router.post("/users", postUser);

//? Ruta .delete
router.delete("/users/:id", deleteUsers)

//? Ruta .put
router.put("/users/:id", putUsers)

export default router;
