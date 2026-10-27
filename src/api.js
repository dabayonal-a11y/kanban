
const API_URL = "http://localhost:3001/api/tasks";

// Consultar todas las tareas
export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar las tareas");
  }

  return response.json();
}

// Crear una tarea
export async function createTask(title, priority) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, priority }),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la tarea");
  }

  return response.json();
}

// Cambiar el estado de una tarea
export async function updateStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("No se pudo mover la tarea");
  }

  return response.json();
}

// Eliminar una tarea
export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la tarea");
  }

  return response.json();
}
