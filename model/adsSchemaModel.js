const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const adsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  petOwnerUsername: {
    type: String,
    required: true
  },
  healthCondition: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    required: true
  }
});
const Advertisement = mongoose.model("Advertisement", adsSchema);
module.exports = Advertisement;
