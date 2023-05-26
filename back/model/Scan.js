const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema(
  {
    rfidBadgeNumberLog: {
      type: Number,
      unique: false,

    },

  },

  { timestamps: true }
);

module.exports = mongoose.model("Scan", ScanSchema, "logs");
ScanSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 });