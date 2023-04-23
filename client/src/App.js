import Axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [tecido, setTecido] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const [listaTecidos, setListaTecidos] = useState([]);

  const cadastrar = () => {
    Axios.post("http://localhost:3001/cadastrar", {
      tecido: tecido,
      quantidade: quantidade,
    }).then(() => {
      setListaTecidos([
        ...listaTecidos,
        {
          tecido: tecido,
          quantidade: quantidade,
        },
      ]);
    });
  };

  const listarTecidos = () => {
    Axios.get("http://localhost:3001/tecidos").then((response) => {
      setListaTecidos(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Tecido:</label>
        <input
          type="text"
          onChange={(event) => {
            setTecido(event.target.value);
          }}
        />
        <label>Quantidade (metros):</label>
        <input
          type="number"
          onChange={(event) => {
            setQuantidade(event.target.value);
          }}
        />
        <button onClick={cadastrar}>Cadastrar</button>
        <div className="tecidos">
          <button onClick={listarTecidos}> Listar Tecidos Cadastrados</button>
          {listaTecidos.map((val, key) => {
            return (
              <div className="tecido">
                <h3>Tecido: {val.tecido}</h3>
                <h3>Quantidade: {val.quantidade}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
