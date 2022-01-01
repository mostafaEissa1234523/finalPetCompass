const express = require("express");
const adsController = require("../controller/adsController");

const checkPetOwenerAuth = require("../middlewares/auth");

const router = express.Router();
router.get("/", adsController.getadvertiseAdoption);
router.get("/:_id", adsController.getadvertiseAdoptionById);
router.post("/", checkPetOwenerAuth, adsController.postadvertiseAdoption);
router.post(
  "/advertisementPayment",
  checkPetOwenerAuth,
  adsController.postAdvertisementPayment
);

router.delete("/:index", checkPetOwenerAuth, adsController.deleteAddAdoption);

module.exports = router;
