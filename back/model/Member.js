const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: String,
    memberActive: Date,
    rfidBadgeNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    imagePic: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
