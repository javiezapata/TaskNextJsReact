"use client";
import { useEffect, useState } from "react";
import { Task } from "./types/Task";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchTasks();
    }
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      const res = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: selectedTask.completed }),
      });
      if (res.ok) {
        setSelectedTask(null);
        setTitle("");
        setDescription("");
        fetchTasks();
      }
    }
  };

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

      <form
        onSubmit={selectedTask ? updateTask : addTask}
        className="mb-4 flex flex-col gap-2"
      >
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">
          {selectedTask ? "Actualizar tarea" : "Agregar tarea"}
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded flex justify-between">
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white p-1 rounded"
                onClick={() => toggleCompleted(task.id, task.completed)}
              >
                {task.completed ? "Desmarcar" : "Completar"}
              </button>
              <button
                className="bg-yellow-500 text-white p-1 rounded"
                onClick={() => {
                  setSelectedTask(task);
                  setTitle(task.title);
                  setDescription(task.description || "");
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
