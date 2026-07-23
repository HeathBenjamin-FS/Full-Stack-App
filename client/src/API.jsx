import axios from "axios";

const BASE = "http://localhost:3000/api/v1";

export const fetchTrainers = async () => {
  const response = await axios.get(`${BASE}/trainers`);
  //   console.log(response);
  return response;
};

export const fetchPokemon = async () => {
  const response = await axios.get(`${BASE}/pokemon`);

  return response;
};

export const createTrainer = async (trainer) => {
  const response = await axios.post(`${BASE}/trainers`, trainer);
  return response;
};

export const createPokemon = async (pokemon) => {
  const response = await axios.post(`${BASE}/pokemon`, pokemon);
  return response;
};
