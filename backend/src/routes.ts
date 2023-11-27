import { Router } from "express";

import CategoryController from "./controllers/CategoryController";
import ContactController from "./controllers/ContactController";
import asyncHandler from "./utils/asyncHandler";

const router = Router();

// Contacts
router.get("/contacts", asyncHandler(ContactController.index));
router.get("/contacts/:id", asyncHandler(ContactController.show));
router.post("/contacts", asyncHandler(ContactController.store));
router.put("/contacts/:id", asyncHandler(ContactController.update));
router.delete("/contacts/:id", asyncHandler(ContactController.delete));

// Categories
router.get("/categories", asyncHandler(CategoryController.index));
router.get("/categories/:id", asyncHandler(CategoryController.show));
router.post("/categories", asyncHandler(CategoryController.store));
router.put("/categories/:id", asyncHandler(CategoryController.update));
router.delete("/categories/:id", asyncHandler(CategoryController.delete));

export default router;
