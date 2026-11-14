import { Router } from "express";
import { classesFilter } from "../middleware/classesFilter.js";
import { showClasses } from "../controllers/classController.js";

const router = Router();

router.get("/", classesFilter, showClasses);

export default router;