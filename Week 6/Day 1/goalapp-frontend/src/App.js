import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import AllGoals from './components/AllGoals'
import CreateGoal from './components/CreateGoal'

const App = () => {

  const goals = [
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
  ]


  return (
    <>
    <Navbar />
    {/* <Login  /> */}
    {/* <Signup /> */}
    <AllGoals goals={goals} />
    {/* <CreateGoal /> */}
    </>
  )
}

export default App
