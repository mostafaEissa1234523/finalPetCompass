const Advertisement = require("../model/adsSchemaModel");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.getadvertiseAdoption = (req, res, next) => {
  const allAdvertisedPets = new Advertisement();
  Advertisement.find()
    .sort({ isPremium: -1 })
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

exports.getadvertiseAdoptionById = (req, res, next) => {
  const petId = req.params._id;
  Advertisement.findById(petId)
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

exports.postAdvertisementPayment = async (req, res, next) => {
  const { cardNumber, expiryMonth, expiryYear, cvv } = req.body;

  console.log(req.body);

  let charge;

  try {
    const token = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvv
      }
    });

    charge = await stripe.charges.create({
      amount: 100,
      currency: "egp",
      source: token.id,
      capture: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "Bad request."
    });
  }

  res.send({
    charge: charge
  });
};

exports.postadvertiseAdoption = (req, res, next) => {
  const petAdvertise = new Advertisement({
    name: req.body.name,
    age: req.body.age,
    type: req.body.type,
    gender: req.body.gender,
    petOwnerUsername: req.body.petOwnerUsername,
    healthCondition: req.body.healthCondition,
    isPremium: req.body.isPremium
  });
  petAdvertise
    .save()
    .then((result) => {
      return res.status(200).json({
        msg: "Success",
        petPosted: petAdvertise
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Server error, please check input and try again later"
      });
    });
};

exports.deleteAddAdoption = (req, res, next) => {
  const petId = req.params.index;
  Advertisement.findByIdAndDelete(petId)
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
