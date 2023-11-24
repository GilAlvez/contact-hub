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
router.post("/categories", CategoryController.store);

export default router;
