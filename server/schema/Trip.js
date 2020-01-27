
const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const Trip = mongoose.Schema(
  {
    date: {
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
    users: {
        type: Array,
        required: true
    },
    trains: {
        type: Array,
        required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

Trip.methods = {

};

module.exports = mongoose.model("Trip", Trip);