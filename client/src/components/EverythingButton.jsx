import React from "react";

const EverythingButton = ({ handleSubmit }) => {
  return (
    <button onClick={handleSubmit} style={styles.button}>
      Click me to see everything!
    </button>
  );
};

export default EverythingButton;

const styles = {
  button: {
    padding: "1rem",
    marginTop: "1rem",
  },
};
