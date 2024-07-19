import React from "react";
import { Link, useNavigate } from 'react-router-dom'
const Goal = (props) => {

  const navigate = useNavigate();
  
  const removeGoal = async (e) => {
    // e.preventDefault();
    let token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }

    const response = await fetch (`http://localhost:5000/api/goals/${props.goal._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })

    if(response.status === 200) {
      alert('Goal deleted')
    }
    else{
      alert('some error occured!!')
    }
  }
  return (
    <>
      {/* display goals in one card */}
      <div className="flex justify-center items-center  p-6 mt-[-45px] w-4/5">
        <div className="my-[20px] w-full">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {props.goal.text}
          </h2>
          <p className="text-600 text-gray-800">{props.goal.description}</p>
          {/* remove button */}
        </div>
        <button 
        className="w-1/2 py-3 bg-red-600 text-white rounded hover:bg-red-500 m-2"
        onClick={() => removeGoal()}
        >
          Remove
        </button>
        {/* Update Goal */}
        <Link to='/updategoal' className="w-1/2">
        <button 
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-500 m-2"
        // on click update goal, pass the goal id, 
        onClick={() => props.updateGoalCall(props.goal._id)}
        >
          Update
        </button>
        </Link>
      </div>
    </>
  );
};

export default Goal;
