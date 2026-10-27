
import TaskCard from "./TaskCard.jsx";

export default function Column({ title, tasks }) {
  return (
    <section className="column">
      <h2>
        {title} ({tasks.length})
      </h2>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
