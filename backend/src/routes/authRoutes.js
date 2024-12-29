const express = require("express");
const { registerUser,
    loginUser ,
    updateUser, 
    createFolder,
    createFile,
    getFoldersAndFiles,
    deleteFolder,
    deleteFile} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authenticateToken, updateUser);
router.post("/folders", authenticateToken, createFolder);
router.post("/files", authenticateToken, createFile);
router.delete("/folders/:id", authenticateToken, deleteFolder); // Delete folder
router.delete("/files/:id", authenticateToken, deleteFile); 
router.get('/data', authenticateToken, getFoldersAndFiles);


module.exports = router;
