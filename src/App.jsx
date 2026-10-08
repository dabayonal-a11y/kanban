import { useEffect, useMemo, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import useLocalStorage from "./hooks/useLocalStorage";

const initialTasks = [
  {
    id: 1,
    title: "Diseñar la base de datos",
    status: "done",
    priority: "alta",
  },
  {
    id: 2,
    title: "Crear el login",
    status: "doing",
    priority: "media",
  },
  {
    id: 3,
    title: "Escribir pruebas",
    status: "todo",
    priority: "baja",
  },
  {
    id: 4,
    title: "Preparar la demo",
    status: "todo",
    priority: "alta",
  },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", initialTasks);

  // Efecto para cambiar el título de la pestaña
  useEffect(() => {
    document.title = `Kanban (${tasks.length} tareas)`;
  }, [tasks]);

  // Estado para el buscador
  const [search, setSearch] = useState("");

  // Filtrar tareas usando useMemo
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  function addTask(title, priority) {
    const newTask = {
      id: Date.now(),
      title,
      status: "todo",
      priority,
    };

    setTasks([...tasks, newTask]);
  }

  function moveTask(id, newStatus) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <main>
      <h1>Kanban</h1>

      <TaskForm onAdd={addTask} />

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={filteredTasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
          />
        ))}
      </div>
    </main>
  );
}