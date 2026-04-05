import React, { useState } from "react";
import Modal from "react-modal";
import "./App.css";

// Required for accessibility
Modal.setAppElement("#root");

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [joke, setJoke] = useState({
    setup: "",
    punchline: ""
  });

  const fetchJoke = async () => {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    setJoke({
      setup: data.setup,
      punchline: data.punchline
    });
  };

  const openModal = () => {
    setIsOpen(true);
    fetchJoke();
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="app">
      <button onClick={openModal}>Open Joke Modal</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Random Joke</h2>
        <p className="subtitle">Click the button to fetch a fresh one.</p>

        <button onClick={fetchJoke}>Fetch joke</button>

        <p className="setup">{joke.setup}</p>
        <p className="punchline">{joke.punchline}</p>

        <button className="closeBtn" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;