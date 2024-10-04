const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewForm,
  renderEditForm,
  showListings,
  createNewListing,
  updateListing,
  deleteListing,
} = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(index)) 
  .post(
    
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createNewListing)
  );

//New Route
router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(showListings))
  .put( isLoggedIn, isOwner, upload.single("listing[image]"),validateListing,wrapAsync(updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

//Index Route
// router.get("/", wrapAsync(index))

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

//Show Route
// router.get("/:id", wrapAsync(showListings));

//Create Route
// router.post("/", validateListing, isLoggedIn, wrapAsync(createNewListing));

//Update Route
// router.put(
//   "/:id",
//   validateListing,
//   isLoggedIn,
//   isOwner,
//   wrapAsync(updateListing)
// );

//Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
