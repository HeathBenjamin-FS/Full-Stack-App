const router = require("express").Router();
const { getAllTrainers, createTrainer, getAllTrainersById, updateTrainer, deleteTrainer } = require("../controllers/trainerController");

router.get("/", getAllTrainers);

router.post("/", createTrainer);

router.get("/:id", getAllTrainersById);

router.put("/:id", updateTrainer);

router.delete("/:id", deleteTrainer);

module.exports = router;
