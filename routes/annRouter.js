const express = require("express");
const annController = require("../controller/annController");
const router = express.Router();

const checkPetOwenerAuth = require("../middlewares/auth");

// get All announced pet as lost
router.get("/", annController.getannouncedLost);
// get lost pet by id
router.get("/:_id", annController.getannouncedLostById);
// Post Announcement of pet lost
router.post("/", checkPetOwenerAuth, annController.postPetLost);
// delete an announcement of pet lost
router.delete("/:index", checkPetOwenerAuth, annController.deleteAnnouncement);

module.exports = router;
