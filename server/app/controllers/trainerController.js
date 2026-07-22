const Trainer = require("../models/Trainer");

const getAllTrainers = async (req, res) => {
  try {
    let queryObj = { ...req.query };

    const excludedFields = ["select", "sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Trainer.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");

      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    query = query.populate("pokemon");

    const trainers = await query;

    console.log("====================");
    console.log("Query Params:", req.query);
    console.log("Filtered Object", JSON.parse(queryStr));
    console.log("====================");

    res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers,
      page: page,
      method: req.method,
      message: "Trainer router request made!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Something failed, please try again.",
    });
  }
};

const createTrainer = async (req, res) => {
  try {
    console.log(req.body);
    const trainer = await Trainer.create(req.body);
    res.status(201).json({
      data: trainer,
      success: true,
      method: req.method,
      message: "Trainer route post request made and data pushed.",
    });
  } catch (error) {
    console.log(error);
    if (error === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Creation failed, please verify information and try again.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An internal error occured",
      error: error,
    });
  }
};

const getAllTrainersById = async (req, res) => {
  const { id } = req.params;
  try {
    const trainerID = await Trainer.findById(id).populate("pokemon");
    res.status(200).json({
      id,
      data: trainerID,
      success: true,
      method: req.method,
      message: "Trainer route request made with ID.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not find this Trainer's ID. Veryify information and try again.",
      method: req.method,
    });
  }
};

const updateTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainerUpdate = await Trainer.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      id,
      data: trainerUpdate,
      success: true,
      method: req.method,
      message: "Trainer route put request made with ID. Data updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not update this Trainer. Try again.",
    });
  }
};

const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTrainer = await Trainer.findByIdAndDelete(id);
    res.status(200).json({
      id,
      data: deleteTrainer,
      success: true,
      method: req.method,
      message: "Trainer route delete request made with ID.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not delete the Trainer. Please try again.",
    });
  }
};

module.exports = {
  getAllTrainers, //.find()
  createTrainer, //.create()
  getAllTrainersById, // .findById()
  updateTrainer, // .findByIdAndUpdate() (with options)
  deleteTrainer, // .findByIdAndDelete()
};
