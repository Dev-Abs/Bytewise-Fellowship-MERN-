import React from "react";

const Goal = (props) => {
  return (
    <>
      {/* display goals in one card */}
      <div className="flex justify-center items-center  p-6 mt-[-45px] w-4/5">
        <div className="my-[20px] w-full">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {props.goal.title}
          </h2>
          <p className="text-600 text-gray-800">{props.goal.description}</p>
          {/* remove button */}
        </div>
        <button 
        className="w-1/2 py-3 bg-red-600 text-white rounded hover:bg-red-500 m-2"
        onClick={() => props.removeGoal(props.goal.id)}
        >
          Remove
        </button>
        {/* Update Goal */}
        <button 
        className="w-1/2 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 m-2"
        // on click update goal, pass the goal id, 
        onClick={() => props.updateGoalCall(props.goal.id)}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Goal;
