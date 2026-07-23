import React from "react";
import Trainer from "./Trainers";

const TrainerList = ({ trainers }) => {
  if (!trainers || trainers.length === 0) {
    return <p>No trainers found in the database.</p>;
  }

  return (
    <>
      <h4>Trainers: {trainers.length}</h4>

      <ul>
        {trainers.map((trainer) => (
          <li key={trainer._id}>
            Name: {trainer.name} <br />
            Badges: {trainer.badges} <br />
            Age: {trainer.age} <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrainerList;
