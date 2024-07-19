import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AllGoals from "./components/AllGoals";
import CreateGoal from "./components/CreateGoal";
import UpdateGoal from "./components/UpdateGoal";
import Home from "./components/Home";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [id, setID] = useState('')

  const [updatedGoal, setUpdatedGoal] = useState({
    id: null,
    title: "",
    description: "",
  });

  const addGoal = (goal) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newGoal = { id, ...goal };
    setGoals([...goals, newGoal]);
  };

  const removeGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const updateGoalCall = (id) => {
    console.log('id', id, typeof(id))
    setID(id)
    // const goal = goals.find((goal) => goal.id === id);
    // setUpdatedGoal({
    //   id: goal.id,
    //   title: goal.title,
    //   description: goal.description,
    // });
    // console.log(updatedGoal)
    // setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)))
  };

  const updateGoal = (updatedGoalFinal) => {
    // setGoals(
    //   goals.map((goal) =>
    //     goal.id === updatedGoalFinal.id ? updatedGoalFinal : goal
    //   )
    
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/allgoals"
          element={
            <AllGoals
              goals={goals}
              removeGoal={removeGoal}
              updateGoalCall={updateGoalCall}
              setGoals={setGoals}
            />
          }
        />

        <Route path="/creategoal" element={<CreateGoal addGoal={addGoal} />} />

        <Route
          path="/updategoal"
          element={<UpdateGoal id={id} goal={updatedGoal} updateGoal={updateGoal} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
