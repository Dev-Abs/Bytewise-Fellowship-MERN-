import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks"; 
import {useState, useEffect} from 'react';

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
const [tasks, setTasks] = useState([]);

useEffect(()=>{
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }
  getTasks();
},[])

const fetchTasks = async () => {
  const tasksFromServer = await fetch('http://localhost:3000/tasks');
  const data = await tasksFromServer.json();
  return data
}

// Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000) + 1;
  const newTask = {id, ...task};
  setTasks([...tasks, newTask]);
};

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, 
    {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
};

// Toggle Reminder
const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) => 
      task.id === id ? {...task,reminder:!task.reminder} : task
    )
  ) 
}
  return (
    <div className="container">
      <Header showAddTask={showAddTask}  onAdd={()=>{setShowAddTask(!showAddTask)}} />
      {showAddTask ? <AddTask onAdd={addTask}/> : ''}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
    </div>
  );

}
