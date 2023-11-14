import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Result from "./components/Result";

function App() {
  return (
    <>
      <Header />
      <main className="fade-in-up">
        <div className="card">
          <Form />
          <Result />
        </div>
      </main>
    </>
  );
}

export default App;
