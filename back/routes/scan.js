const router = require("express").Router();
const Scan = require("../model/Scan");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");


// Create Scan
router.post("/", async (req, res) => {
  const newScan = new Scan(req.body);
  try {
    const savedScan = await newScan.save();
    res.status(200).json(savedScan);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Scan list or Search Scan by rfid or Scanid query parameters
router.get("/", async (req, res) => {

  try {
    const scanList = await Scan.find();
    res.status(200).json(scanList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get scan by ID
router.get("/:id", async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    res.status(200).json(scan);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



module.exports = router;
