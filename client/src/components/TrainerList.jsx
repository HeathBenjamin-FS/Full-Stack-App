import React from "react";
import Trainer from "./Trainers";

const TrainerList = ({ trainers, onSelectTrainer }) => {
  if (!trainers || trainers.length === 0) {
    return <p>No trainers found in the database.</p>;
  }

  return (
    <>
      <h4>Trainers: {trainers.length}</h4>

      <ul>
        {trainers.map((trainer) => (
          <li key={trainer._id} style={style.spacer}>
            Name: {trainer.name} <br />
            Badges: {trainer.badges} <br />
            Age: {trainer.age} <br />
            <button onClick={(e) => onSelectTrainer(trainer._id)}>Show Pokemon</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrainerList;

const style = {
  spacer: {
    padding: "1rem",
  },
};
