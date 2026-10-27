
import { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./columns.js";
import Column from "./components/Column.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { useBoard } from "./context/BoardContext.jsx";

export default function App() {
  const { tasks, loading, error } = useBoard();
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  useEffect(() => {
    document.title = `Kanban (${tasks.length} tareas)`;
  }, [tasks.length]);

  if (loading) {
    return (
      <main className="app">
        <h1>Kanban</h1>
        <p>Cargando tareas desde MySQL...</p>
      </main>
    );
  }

  return (
    <main className="app">
      <h1>Kanban ({tasks.length} tareas)</h1>

      {error && <p role="alert">{error}</p>}

      <TaskForm />

      <input
        className="search"
        type="text"
        placeholder="Buscar tarea..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="board">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            title={column.title}
            tasks={filteredTasks.filter(
              (task) => task.status === column.id
            )}
          />
        ))}
      </div>
    </main>
  );
}
