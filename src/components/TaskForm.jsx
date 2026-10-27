
import { useState } from "react";
import { useBoard } from "../context/BoardContext.jsx";

export default function TaskForm() {
  const { addTask } = useBoard();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    addTask(title.trim(), priority);
    setTitle("");
    setPriority("media");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <button type="submit">Agregar</button>
    </form>
  );
}
