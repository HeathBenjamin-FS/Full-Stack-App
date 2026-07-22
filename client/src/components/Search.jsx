import React from "react";
import { useState } from "react";

const Search = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <form style={styles.form} onSubmit={onSubmit}>
      <label htmlFor="firstField">Search here!</label>
      <input type="text" id="firstField" name="search" value={term} onChange={handleChange} />
      {/* <label htmlFor="secondField">Enter your second field:</label> */}
      {/* <input type="text" id="secondField" name="search" value={term} onChange={handleChange} />
      {term.length < 3 && <p>Search term must be at least 3 characters</p>} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Search;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    justifyContent: "center",
    gap: "1rem",
  },
};
