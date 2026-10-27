
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  getTasks,
  createTask as createTaskAPI,
  updateStatus,
  deleteTask as deleteTaskAPI,
} from "../api";

const BoardContext = createContext(null);

function boardReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

    case "ADD_TASK":
      return [...state, action.payload];

    case "MOVE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );

    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [tasks, dispatch] = useReducer(boardReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        dispatch({ type: "SET_TASKS", payload: data });
        setError("");
      } catch (err) {
        setError(
          "No se pudieron cargar las tareas. Verifica que la API esté funcionando."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function addTask(title, priority) {
    try {
      const newTask = await createTaskAPI(title, priority);
      dispatch({ type: "ADD_TASK", payload: newTask });
      setError("");
    } catch (err) {
      setError("No se pudo guardar la tarea en la base de datos.");
      console.error(err);
    }
  }

  async function moveTask(id, status) {
    try {
      const updatedTask = await updateStatus(id, status);
      dispatch({
        type: "MOVE_TASK",
        payload: { id: updatedTask.id, status: updatedTask.status },
      });
      setError("");
    } catch (err) {
      setError("No se pudo actualizar el estado de la tarea.");
      console.error(err);
    }
  }

  async function removeTask(id) {
    try {
      await deleteTaskAPI(id);
      dispatch({ type: "REMOVE_TASK", payload: id });
      setError("");
    } catch (err) {
      setError("No se pudo eliminar la tarea de la base de datos.");
      console.error(err);
    }
  }

  return (
    <BoardContext.Provider
      value={{ tasks, addTask, moveTask, removeTask, loading, error }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard debe usarse dentro de BoardProvider");
  }

  return context;
}

