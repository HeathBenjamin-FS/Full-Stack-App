import axios from "axios";

const BASE = "http://localhost:3000/api/v1";

export const fetchTrainers = async () => {
  const response = await axios.get(`${BASE}/trainers`);
  //   console.log(response);
  return response;
};
