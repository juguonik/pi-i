import Axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const cadastrar = () => {
    Axios.post("http://localhost:3001/create", {
      material: material,
      quantidade: quantidade,
    }).then(() => {
      console.log("sucesso");
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Material:</label>
        <input
          type="text"
          onChange={(event) => {
            setMaterial(event.target.value);
          }}
        />
        <label>Quantidade:</label>
        <input
          type="number"
          onChange={(event) => {
            setQuantidade(event.target.value);
          }}
        />
        <button onClick={cadastrar}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
