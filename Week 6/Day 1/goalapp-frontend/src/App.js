import React, {useState} from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import AllGoals from './components/AllGoals'
import CreateGoal from './components/CreateGoal'
import UpdateGoal from './components/UpdateGoal'

const App = () => {

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Learn React and build a project",
      completed: false
    },
    {
      id: 2,
      title: "Learn Node.js",
      description: "Learn Node.js and build a project",
      completed: false
    }
  ])

  const [updatedGoal, setUpdatedGoal] = useState({id: null, title: '', description: ''})

  const addGoal = (goal) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newGoal = {id, ...goal}
    setGoals([...goals, newGoal])
  }

  const removeGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const updateGoalCall = (id) => {
    const goal = goals.find((goal) => goal.id === id)
    setUpdatedGoal({id: goal.id, title: goal.title, description: goal.description})
    // console.log(updatedGoal)
    // setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)))
  }

  const updateGoal = (updatedGoalFinal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoalFinal.id ? updatedGoalFinal : goal)))
  }


  return (
    <>
    <Navbar />
    {/* <Login  /> */}
    {/* <Signup /> */}
    <AllGoals goals={goals} removeGoal={removeGoal} updateGoalCall={updateGoalCall} />
    <CreateGoal addGoal={addGoal}  />
    <UpdateGoal goal={updatedGoal} updateGoal={updateGoal}/>
    </>
  )
}

export default App
