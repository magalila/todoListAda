import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import pokemon from "./assets/image/pokemon.gif";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="flicker">
        <h1 className="justify-content-center text-light m-3">Todo List</h1>
      </div>

      <div className="container mt-5">
        <div className="row mt-5 mb-2">
          <div className="col md-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="taskInput" className="col h5 text-light">
                      Tarea:
                    </label>
                  </div>
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    id="taskInput"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Escribe una nueva tarea"
                  />
                  <button
                    type="submit"
                    className="btn bg-success p-2 text-white float"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col">
            <div className="row ">
              <div className="col-auto">
                <label htmlFor="filterSelect" className="col h5 text-light">
                  Seleccionar:
                </label>
              </div>
            </div>
            <select
              id="filterSelect"
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="completed">Completas</option>
              <option value="incomplete">Incompletas</option>
            </select>
          </div>
        </div>
        <ul className="list-group mt-4 ">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleComplete(index)}
                >
                  {task.completed ? "Desmarcar" : "Completar"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(index)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="m-5 pt-2 pb-2 text-light ">
        <h5 className="mi-footer">
          <img src="/src/assets/image/pokemon.gif" alt="pokemon" />
          Made by Maggie
        </h5>
      </footer>
    </>
  );
}

export default App;
