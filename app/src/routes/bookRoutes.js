import { Router } from "express";
import { bookFilter } from "../middleware/bookFilter.js";
import { showBooks } from "../controllers/bookController.js";

const router = Router();

// The middleware runs first, then the controller.
router.get("/", bookFilter, showBooks);

export default router;