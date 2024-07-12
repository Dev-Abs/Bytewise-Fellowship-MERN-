import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from "./components/About";
import { useState, useEffect } from "react";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3500/tasks");
    const data = await res.json();
    return data;
  };
  
  const addTask = async (task) => {
    const res = await fetch("http://localhost:3500/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };
  
  const deleteTask = async (id) => {
    console.log(id)
    await fetch(`http://localhost:3500/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const fetchTaskByID = async (id) => {
    console.log(id)
    const res = await fetch(`http://localhost:3500/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTaskByID(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    console.log('id', id)
    console.log(updTask)
    const res = await fetch(`http://localhost:3500/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  

  return (
    <Router>
      <div className="container">
        <Header
          showAddTask={showAddTask}
          onAdd={() => {
            setShowAddTask(!showAddTask);
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
