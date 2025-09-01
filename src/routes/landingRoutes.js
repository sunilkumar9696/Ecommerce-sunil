import express from "express";
import { getLandingPage, updateLandingPage ,clearLandingSection ,deleteSingleImage } from "../controllers/landingPageController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadLandingPage.js";
import {verifySuperAdmin} from '../middlewares/verifySuperAdmin.js';

const router = express.Router();

// ✅ Public route
router.get("/", getLandingPage);

// ✅ Admin route for update
router.put(
  "/",
  verifyToken,
  verifySuperAdmin,
  upload.fields([
    { name: "sliders", maxCount: 10 },
    { name: "offers", maxCount: 10 },
    { name: "socialMedia", maxCount: 10 }
  ]),
  updateLandingPage
);

router.delete("/:section", verifyToken, verifySuperAdmin, clearLandingSection);

router.delete("/:section/:index", verifyToken, verifySuperAdmin, deleteSingleImage);

export default router;