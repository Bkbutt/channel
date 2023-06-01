const express = require("express");
const router  = express.Router();
const {signup,login,getUserData}= require("../controllers/authController");



router.post('/signup',signup);
router.post("/login",login);
router.get("/user/:id",getUserData);







module.exports= router;







