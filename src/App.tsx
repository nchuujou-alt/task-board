import { useEffect, useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import type { Task } from './types'
import './App.css'

const STORAGE_KEY = 'task-board.tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="task-board">
      <h1>タスクボード</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      {tasks.length > 0 && (
        <p className="task-summary">
          残り {remainingCount} / {tasks.length} 件
        </p>
      )}
    </div>
  )
}

export default App
