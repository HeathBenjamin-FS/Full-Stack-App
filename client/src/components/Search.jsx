import React from "react";
import { useState } from "react";

const Search = () => {
  return (
    <form style={styles.form}>
      <label htmlFor="firstField">Enter your first field:</label>
      <input type="text" id="firstField" />
      <label htmlFor="secondField">Enter your second field:</label>
      <input type="text" id="secondField" />
    </form>
  );
};

export default Search;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    justifyContent: "center",
  },
};
