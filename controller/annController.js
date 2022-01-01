const Announcement = require("../model/annSchemaModel");

exports.getannouncedLost = (req, res, next) => {
  const allAnnouncedPets = new Announcement();
  Announcement.find()
    .then((result) => {
      return res.status(200).json({
        msg: "Success",
        pets: result
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Server error, please check input and try again later"
      });
    });
};
exports.getannouncedLostById = (req, res, next) => {
  const petId = req.params._id;
  Announcement.findById(petId)
    .then((result) => {
      return res.status(200).json({
        msg: "Success",
        pet: result
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Server error, please check input and try again later"
      });
    });
};

exports.postPetLost = (req, res, next) => {
  const petLostPost = new Announcement({
    name: req.body.name,
    age: req.body.age,
    type: req.body.type,
    gender: req.body.gender,
    petOwnerUsername: req.body.petOwnerUsername,
    healthCondition: req.body.healthCondition
  });
  petLostPost
    .save()
    .then((result) => {
      return res.status(200).json({
        msg: "Success",
        petPosted: petLostPost
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Server error, please check input and try again later"
      });
    });
};

exports.deleteAnnouncement = (req, res, next) => {
  const petId = req.params.index;
  Announcement.findByIdAndDelete(petId)
    .then((result) => {
      return res.status(200).json({
        msg: "Success",
        pet: result
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Server error, please check input and try again later"
      });
    });
};
