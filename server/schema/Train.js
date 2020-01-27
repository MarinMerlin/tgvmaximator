
const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const Train = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    hour: {
        type: Date,
        required: true
    },
    origin: {
      type: String,
      required: true
    },
    destination: {
        type: String,
        required: true
      },
  },
  { timestamps: { createdAt: "created_at" } }
);

Train.methods = {

};

module.exports = mongoose.model("Train", Train);