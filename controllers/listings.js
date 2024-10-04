const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/index.ejs", {
    allListings,
  });
};

const renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

const showListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exists");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", {
    listing: listing,
  });
};

const renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exists");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("./listings/edit.ejs", {
    listing,
    originalImageUrl,
  });
};

const createNewListing = async (req, res, next) => {
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  if (!newListing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

const updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

const deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports = {
  index,
  renderNewForm,
  renderEditForm,
  showListings,
  createNewListing,
  updateListing,
  deleteListing,
};
