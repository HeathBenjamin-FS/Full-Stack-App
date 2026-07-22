import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import TrainerList from "./components/TrainerList";
import { fetchTrainers } from "./API";

import "./App.css";

function App() {
  const [trainers, setTrainers] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.firstField.value);

    const data = await fetchTrainers();

    setTrainers(data.data.data);

    console.log(trainers);
    return data;
  };

  useEffect(() => {
    fetchTrainers()
      .then((res) => {
        console.log(res.data.data);
        setTrainers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main style={styles.main}>
        <Search onSubmit={onSubmit} />

        {/* <h4>Trainers: {trainers.length}</h4> */}

        <TrainerList trainers={trainers} />

        {/* {trainers.length === 0 ? (
          <p>There are no trainers</p>
        ) : (
          trainers.map((trainer) => (
            <ul key={trainer._id}>
              <li>
                Name:
                {trainer.name} <br />
                Badges:
                {trainer.badges} <br />
              </li>
            </ul>
          ))
        )} */}

        {/* 
        // <ul>
        //   {collectionOne.map((trainer) => {
        //     return (
        //       <li key={trainer._id}>
        //         <strong>Name: </strong>
        //         {trainer.name}
        //         <br />
        //         <strong>Badges: </strong>
        //         {trainer.badges}
        //         <br />
        //         <strong>Age: </strong>
        //         {trainer.age}
        //       </li>
        //     );
        //   })}
        // </ul> */}
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
};
