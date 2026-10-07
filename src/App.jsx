import Column from "./components/Column";

const COLUMNS = [
  { id: "todo", title: "Por hacer" },
  { id: "doing", title: "En progreso" },
  { id: "review", title: "Revisión" },
  { id: "done", title: "Hecho" },
];

const tasks = [
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
    status: "doing",
    priority: "baja",
  },
  {
    id: 4,
    title: "Preparar la demo",
    status: "todo",
    priority: "alta",
  },
  {
    id: 5,
    title: "Diseñar la interfaz",
    status: "todo",
    priority: "media",
  },
  {
    id: 6,
    title: "Crear documentación",
    status: "doing",
    priority: "baja",
  },
  {
    id: 7,
    title: "Revisar el proyecto",
    status: "done",
    priority: "alta",
  },
];

export default function App() {
  return (
    <main>
      <h1>Kanban ({tasks.length} tareas)</h1>

      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </main>
  );
}