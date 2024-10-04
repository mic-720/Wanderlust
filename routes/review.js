const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");

//Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

//Review Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview)
);

module.exports = router;
