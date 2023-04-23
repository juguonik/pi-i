import Axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [tecido, setTecido] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const [novaQuantidade, setNovaQuantidade] = useState(0);

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

  const atualizarQuantidade = (id) => {
    Axios.put("http://localhost:3001/atualizar", {
      quantidade: novaQuantidade,
      id: id,
    }).then((response) => {
      setListaTecidos(
        listaTecidos.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                tecido: val.tecido,
                quantidade: novaQuantidade,
              }
            : val;
        })
      );
    });
  };

  const excluirTecido = (id) => {
    Axios.delete(`http://localhost:3001/excluir/${id}`).then((response) => {
      setListaTecidos(
        listaTecidos.filter((val) => {
          return val.id !== id;
        })
      );
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
                <div>
                  <h3>Tecido: {val.tecido}</h3>
                  <h3>Quantidade: {val.quantidade}</h3>
                </div>
                <div className="atualizacao">
                  <input
                    type="text"
                    placeholder="300..."
                    onChange={(event) => {
                      setNovaQuantidade(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      atualizarQuantidade(val.id);
                    }}
                  >
                    Atualizar Quantidade
                  </button>
                  <div className="excluir">
                    <button
                      onClick={() => {
                        excluirTecido(val.id);
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
