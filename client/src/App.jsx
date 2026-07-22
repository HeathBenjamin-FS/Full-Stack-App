import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";

import "./App.css";

// const fetchTrainers = async (e) => {
//   e.preventDefault();
// };

function App() {
  const [collectionOne, setCollectionOne] = useState([]);

  const urlAPI = "http://localhost:3000/api/v1/trainers";

  useEffect(() => {
    console.log("test 2");
    const testConnection = async () => {
      console.log("Fetch started");
      try {
        const response = await axios.get(urlAPI);
        console.log(response.data.data);

        setCollectionOne(response.data);

        console.log("Full data response:", response);
      } catch (error) {
        console.log(error);
      }
    };
    testConnection();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Search />

        <div></div>
      </main>
    </>
  );
}

export default App;
