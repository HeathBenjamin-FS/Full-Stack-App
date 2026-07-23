import React from "react";
import { useState } from "react";

const PokemonCreator = ({ handlePokemonCreation, trainers }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePokemonCreation({
      species: name,
      level: Number(level),
      type: type,
      trainer: selectedTrainer,
    });

    setName("");
    setLevel("");
    setType("");
    setSelectedTrainer("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4>Pokemon Creator!</h4>
      <input type="text" placeholder="Pokemon Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Pokemon Level" value={level} onChange={(e) => setLevel(e.target.value)} />
      <input type="text" placeholder="Pokemon Type" value={type} onChange={(e) => setType(e.target.value)} />
      <label htmlFor="trainerSelect"></label>
      <select id="trainerSelect" onChange={(e) => setSelectedTrainer(e.target.value)} value={selectedTrainer}>
        <option>---Choose a Trainer---</option>
        {trainers.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <button type="submit">Create Pokemon!</button>
    </form>
  );
};

export default PokemonCreator;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
};
