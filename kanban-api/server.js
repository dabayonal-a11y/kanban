
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kanban_db",
  waitForConnections: true,
  connectionLimit: 10,
});

const STATUS = ["todo", "doing", "review", "done"];

// Consultar todas las tareas
app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudieron consultar las tareas" });
  }
});

// Crear una tarea
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, priority = "media" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    if (!["alta", "media", "baja"].includes(priority)) {
      return res.status(400).json({ error: "Prioridad no válida" });
    }

    const [result] = await pool.execute(
      "INSERT INTO tasks (title, status, priority) VALUES (?, 'todo', ?)",
      [title.trim(), priority]
    );

    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudo crear la tarea" });
  }
});

// Cambiar el estado de una tarea
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!STATUS.includes(status)) {
      return res.status(400).json({ error: "Estado no válido" });
    }

    const [result] = await pool.execute(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudo mover la tarea" });
  }
});

// Eliminar una tarea
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const [result] = await pool.execute(
      "DELETE FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
});

// Iniciar el servidor después de verificar MySQL
async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión con MySQL establecida correctamente.");
    connection.release();

    app.listen(PORT, () => {
      console.log(`API disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar con MySQL:", error.message);
    console.error("Verifica que MySQL esté iniciado y las credenciales sean correctas.");
    process.exit(1);
  }
}

startServer();
