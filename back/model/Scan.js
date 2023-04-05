const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema(
  {
    uid: Number
  },

  { timestamps: true }
);

module.exports = mongoose.model("Scan", ScanSchema);
ScanSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 });