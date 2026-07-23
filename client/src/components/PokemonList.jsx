import React from "react";
import Pokemon from "./Pokemon";

const PokemonList = ({ pokemon }) => {
  if (!pokemon || pokemon.length === 0) {
    return <p>No Pokemon found in the database.</p>;
  }

  return (
    <>
      <h4>Pokemon: {pokemon.length}</h4>

      <ul>
        {pokemon.map((poke) => (
          <li key={poke._id}>
            Name: {poke.species} <br />
            Level: {poke.level} <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokemonList;
