import express from "express";
import { addPropertyFavourites, removePropertyFavourites, getPropertyFavourites, getAllProperties } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/favourites", getPropertyFavourites);
router.post("/favourites/:propertyId", addPropertyFavourites);
router.delete("/favourites/:propertyId", removePropertyFavourites);

export default router;
