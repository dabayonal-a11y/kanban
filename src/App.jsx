import { useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";

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
  const [tasks, setTasks] = useState(initialTasks);

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

      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
          />
        ))}
      </div>
    </main>
  );
}