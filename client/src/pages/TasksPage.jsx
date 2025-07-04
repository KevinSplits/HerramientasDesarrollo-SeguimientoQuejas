import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        {/* Botón para volver al dashboard */}
        <Link
          to="/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Volver al Dashboard
        </Link>

        {/* Botón para añadir tarea */}
        <Link
          to="/add-task"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          Añadir Tarea
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl text-center">
              No hay quejas aún, por favor añade una nueva
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}
