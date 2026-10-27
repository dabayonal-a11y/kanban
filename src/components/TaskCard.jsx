
import { useBoard } from "../context/BoardContext.jsx";

export default function TaskCard({ task }) {
  const { moveTask, removeTask } = useBoard();

  return (
    <article className="task-card">
      <h3>{task.title}</h3>

      <p>Prioridad: {task.priority}</p>

      <select
        value={task.status}
        onChange={(event) => moveTask(task.id, event.target.value)}
      >
        <option value="todo">Por hacer</option>
        <option value="doing">En progreso</option>
        <option value="review">Revisión</option>
        <option value="done">Hecho</option>
      </select>

      <button type="button" onClick={() => removeTask(task.id)}>
        Eliminar
      </button>
    </article>
  );
}
