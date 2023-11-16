import { Router } from "express";

import ContactController from "./controllers/ContactController";

const router = Router();

router.get("/", ContactController.index);

export default router;
