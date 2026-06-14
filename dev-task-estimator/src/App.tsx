import { useState } from "react";
import "./App.css";

function App() {
  const [descricao, setDescricao] = useState("");
  const [complexidade, setComplexidade] = useState("Baixa");
  const [tipo, setTipo] = useState("Frontend");
  const [resultado, setResultado] = useState<any>(null);

  const calcularEstimativa = () => {
    let horas = 0;
    let risco = "";

    if (complexidade === "Baixa") {
      horas = 2;
      risco = "Baixo";
    }

    if (complexidade === "Média") {
      horas = 8;
      risco = "Médio";
    }

    if (complexidade === "Alta") {
      horas = 16;
      risco = "Alto";
    }

    const sugestao =
      tipo === "Frontend"
        ? "Divida a tarefa em componentes."
        : tipo === "Backend"
        ? "Planeje as regras de negócio antes de codificar."
        : "Implemente frontend e backend separadamente.";

    const dados = {
      descricao,
      horas,
      risco,
      sugestao,
    };

    setResultado(dados);

    const historico = JSON.parse(
      localStorage.getItem("historico") || "[]"
    );

    historico.push(dados);

    localStorage.setItem(
      "historico",
      JSON.stringify(historico)
    );
  };

  return (
    <div className="container">
      <h1>Dev Task Estimator</h1>

      <input
        type="text"
        placeholder="Descrição da tarefa"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select
        value={complexidade}
        onChange={(e) => setComplexidade(e.target.value)}
      >
        <option>Baixa</option>
        <option>Média</option>
        <option>Alta</option>
      </select>

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option>Frontend</option>
        <option>Backend</option>
        <option>Fullstack</option>
      </select>

      <button onClick={calcularEstimativa}>
        Calcular Estimativa
      </button>

      {resultado && (
        <div className="resultado">
          <h2>Resultado</h2>

          <p>
            <strong>Horas estimadas:</strong>{" "}
            {resultado.horas}
          </p>

          <p>
            <strong>Risco:</strong>{" "}
            {resultado.risco}
          </p>

          <p>
            <strong>Sugestão:</strong>{" "}
            {resultado.sugestao}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;