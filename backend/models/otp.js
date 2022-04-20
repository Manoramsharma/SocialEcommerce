const mongoose = require("mongoose");

//Before starting the database, please create the following index using mongo shell
// db.otp.createIndex( {"createdAt": 1 } , {expireAfterSeconds: 3600} );

const otp = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "email required"] },
    otp: { type: Number, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("otp", otp);
