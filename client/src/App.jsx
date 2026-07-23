import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import TrainerCreator from "./components/TrainerCreator";
import PokemonCreator from "./components/PokemonCreator";
import TrainerList from "./components/TrainerList";
import PokemonList from "./components/PokemonList";
import EverythingButton from "./components/EverythingButton";
import { fetchTrainers, fetchPokemon, createTrainer, createPokemon, seePokemonForTrainer, updatePokemon, updateTrainer } from "./API";

import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [trainers, setTrainers] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data1 = await fetchTrainers();
    const data2 = await fetchPokemon();

    setTrainers(data1.data.data);
    setPokemon(data2.data.data);

    console.log(trainers);
    console.log(pokemon);
  };

  const handleCreation = async (newTrainer) => {
    try {
      await createTrainer(newTrainer);

      const updatedList = await fetchTrainers();
      setTrainers(updatedList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePokemonCreation = async (newPokemon) => {
    try {
      await createPokemon(newPokemon);

      const updatedList = await fetchPokemon();
      setPokemon(updatedList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectTrainer = async (trainerId) => {
    try {
      const res = await seePokemonForTrainer(trainerId);
      setPokemon(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignPokemon = async (pokemonId, newTrainerId) => {
    try {
      await updatePokemon(pokemonId, { trainer: newTrainerId });

      const targetTrainer = trainers.find((t) => t._id === newTrainerId);
      const existingTeam = targetTrainer?.pokemon || [];

      if (!existingTeam.includes(pokemonId)) {
        const fullTeam = [...existingTeam, pokemonId];
        await updateTrainer(newTrainerId, { pokemon: fullTeam });
      }

      const resPoke = await fetchPokemon();
      const resTrainer = await fetchTrainers();

      setPokemon(resPoke.data.data);
      setTrainers(resTrainer.data.data);
    } catch (error) {
      (console.log(error), "Failed to assign pokemon to trainer!");
    }
  };

  useEffect(() => {
    fetchTrainers()
      .then((res) => {
        console.log(res.data.data);
        setTrainers(res.data.data);
      })
      .catch((err) => console.log(err));

    fetchPokemon()
      .then((res) => {
        console.log(res.data.data);
        setPokemon(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main style={styles.main}>
        <TrainerCreator handleCreation={handleCreation} />
        <PokemonCreator handlePokemonCreation={handlePokemonCreation} trainers={trainers} />
        <EverythingButton handleSubmit={handleSubmit} />
        <div style={styles.results}>
          <TrainerList trainers={trainers} onSelectTrainer={onSelectTrainer} />

          <PokemonList pokemon={pokemon} onAssignPokemon={handleAssignPokemon} trainers={trainers} />
        </div>
      </main>
    </>
  );
}

export default App;

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5rem",
  },

  results: {
    display: "flex",
    gap: "5rem",
    marginTop: "3rem",
    padding: "1rem",
  },
};
