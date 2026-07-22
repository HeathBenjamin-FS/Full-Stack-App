const router = require("express").Router();
const { getAllPokemon, createPokemon, getAllPokemonById, updatePokemon, deletePokemon } = require("../controllers/pokemonController");

router.get("/", getAllPokemon);

router.post("/", createPokemon);

router.get("/:id", getAllPokemonById);

router.put("/:id", updatePokemon);

router.delete("/:id", deletePokemon);

module.exports = router;
