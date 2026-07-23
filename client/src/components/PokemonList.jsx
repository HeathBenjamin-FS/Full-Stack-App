import React from "react";
import { useState } from "react";
import Pokemon from "./Pokemon";

const PokemonList = ({ pokemon, trainers, onAssignPokemon }) => {
  const [selectedTrainers, setSelectedTrainers] = useState({});

  const handleSelectChange = (pokemonId, trainerId) => {
    setSelectedTrainers((prev) => ({ ...prev, [pokemonId]: trainerId }));
  };

  if (!pokemon || pokemon.length === 0) {
    return <p>No Pokemon found in the database.</p>;
  }

  return (
    <>
      <h4>Pokemon: {pokemon.length}</h4>

      <ul>
        {pokemon.map((poke) => {
          const isUnassigned = !poke.trainer;
          return (
            <li key={poke._id} style={style.spacer}>
              Name: {poke.species} <br />
              Level: {poke.level} <br />
              Type: {poke.type}
              <br />
              {}
              <select value={selectedTrainers[poke._id] || ""} onChange={(e) => handleSelectChange(poke._id, e.target.value)}>
                <option value="">---Assign Trainer---</option>
                {trainers &&
                  trainers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
              </select>
              <button onClick={() => onAssignPokemon(poke._id, selectedTrainers[poke._id])} disabled={!selectedTrainers[poke._id]}>
                Assign
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PokemonList;

const style = {
  spacer: {
    padding: "1rem",
  },
};
