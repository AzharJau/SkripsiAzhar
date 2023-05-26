const router = require("express").Router();
const Log = require("../model/Log");
const Member = require("../model/Member");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Upload profile image directory
const IMAGE_DIR = "./images/";

// set multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    //generate random uuid
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Limit file upload only to images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format is allowed!"));
    }
  },
});

// Create Log
router.post("/", upload.single("file"), async (req, res) => {
  const newLog = new Log(req.body);
  try {
    // save the generated filename in our MongoDB Atlas database
    if (typeof req.file === "undefined") {
      newLog.imagePic = "./images/defaultPic.png";
    } else {
      newLog.imagePic = req.file.path;
    }
    const savedLog = await newLog.save();
    res.status(200).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// Get Log list or Search Log by rfid or logid query parameters
router.get("/", async (req, res) => {
  try {
    const logs = await Log.aggregate([
      {
        $lookup: {
          from: "members",
          localField: "rfidBadgeNumber",
          foreignField: "rfidBadgeNumberLog",
          as: "memberData",
        },
      },
      {
        $project: {
          _id: 1,
          loginTime: 1,
          accessStatus: 1,
          rfidBadgeNumberLog: 1,
          "memberData.rfidBadgeNumber": 1,
          "memberData.memberId": 1,
          "memberData.fullName": 1,
          "memberData.memberActive": 1,
          "memberData.imagePic": 1,
        },
      },
    ]);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Log by ID
router.get("/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// Delete Log
router.delete("/:id", async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.status(200).json("Log has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
