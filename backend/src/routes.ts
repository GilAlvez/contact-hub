import { Router } from "express";

import CategoryController from "./controllers/CategoryController";
import ContactController from "./controllers/ContactController";

const router = Router();

// Contacts
router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.post("/contacts", ContactController.store);
router.put("/contacts/:id", ContactController.update);
router.delete("/contacts/:id", ContactController.delete);

// Categories
router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.store);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

export default router;
