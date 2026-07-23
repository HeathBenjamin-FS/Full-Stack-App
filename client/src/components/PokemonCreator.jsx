import React from "react";
import { useState } from "react";

const PokemonCreator = ({ handlePokemonCreation }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreation({
      species: name,
      level: Number(level),
    });

    setName("");
    setLevel("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4>Pokemon Creator!</h4>
      <input type="text" placeholder="Pokemon Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Pokemon Level" value={level} onChange={(e) => setLevel(e.target.value)} />

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
