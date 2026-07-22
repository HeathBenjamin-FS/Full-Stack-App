import React from "react";
import Trainer from "./Trainers";

const TrainerList = ({ trainers }) => {
  return (
    <>
      {trainers.map((trainer) => {
        <Trainer key={trainer._id} name={trainer.name} badges={trainer.badges} />;
      })}
    </>
  );
};

export default TrainerList;
