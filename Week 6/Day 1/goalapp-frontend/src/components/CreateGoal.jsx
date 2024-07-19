import React from 'react'

const CreateGoal = () => {
  return (
    <>
              <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Goal</h2>
                <form action="">
                    <div className="mb-6">
                        <label htmlFor="goal" className="block text-gray-800 font-bold">Goal</label>
                        <input type="text" id="goal" name="goal" placeholder="Your Goal" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-800 font-bold">Description</label>
                        <input type="text" id="description" name="description" placeholder="Description" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" />
                    </div>
                    {/* <div className="mb-6">
                        <label htmlFor="dueDate" className="block text-gray-800 font-bold">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" placeholder="Due Date" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" />
                    </div> */}
                    <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-500">Create Goal</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default CreateGoal
