import express from "express";
import {
  getTrendingTvShow, getTvShowTrailers, getTvShowDetails, getSimilarTvShows, getTvShowByCategory 
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTvShow);
router.get("/:id/trailers", getTvShowTrailers)
router.get("/:id/details", getTvShowDetails)
router.get("/:id/similar", getSimilarTvShows)
router.get("/:category", getTvShowByCategory)
export default router