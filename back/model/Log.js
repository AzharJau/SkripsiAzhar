const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {

    rfidBadgeNumberLog: {
      type: Number,
      unique: false,

    },
    loginTime : Date,
    accessStatus: String,
  },

  { timestamps: true }
);
// TTL index on 'createdAt' field
LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });
module.exports = mongoose.model("Log", LogSchema);
