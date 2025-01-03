const express = require('express');
const router = express.Router();
const { saveResponse, getAllResponses } = require("../controllers/authController");

// Route to save a response
router.post('/', (req, res) => {
    console.log('POST request to /api/responses');
    res.status(200).send('Test route working');
  });
  
// Route to get all responses
router.get('/', getAllResponses);

module.exports = router;
