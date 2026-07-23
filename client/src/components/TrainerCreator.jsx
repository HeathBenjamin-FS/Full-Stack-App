import React from "react";
import { useState } from "react";

const TrainerCreator = ({ handleCreation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [badges, setBadges] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreation({
      name,
      age: Number(age),
      badges: Number(badges),
    });

    setName("");
    setAge("");
    setBadges("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4>Trainer Creator!</h4>
      <input type="text" placeholder="Trainer name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Trainer Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="number" placeholder="Trainer badges" value={badges} onChange={(e) => setBadges(e.target.value)} />

      <button type="submit">Create Trainer!</button>
    </form>
  );
};

export default TrainerCreator;

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
