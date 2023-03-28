const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    memberIdLog: {
      type: String,
      unique: false,

    },
    fullName: String,
    memberActive: Date,
    rfidBadgeNumberLog: {
      type: String,
      unique: false,

    },
    imagePic: String,
    loginTime : Date,
    accessStatus: String,
  },

  { timestamps: true }
);
// TTL index on 'createdAt' field
LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });
module.exports = mongoose.model("Log", LogSchema);
