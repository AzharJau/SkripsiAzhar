const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      unique: true,
    },
    fullName: String,
    memberActive: Date,
    rfidBadgeNumber: {
      type: Number,
      unique: true,
      sparse: true,
      required: true,
    },
    imagePic: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
