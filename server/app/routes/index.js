const express = require("express");
const router = express.Router();
const trainerRoutes = require("./trainerRoutes");
const pokemonRoutes = require("./pokemonRoutes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    method: req.method,
  });
});

router.use("/trainers", trainerRoutes);
router.use("/pokemon", pokemonRoutes);

module.exports = router;
