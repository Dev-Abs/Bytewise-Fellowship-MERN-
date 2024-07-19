import React from 'react'
import Goal from './Goal'

const AllGoals = (props) => {
  return (
      <div className='h-screen flex justify-center items-center flex-col bg-gray-200 w-full '>
        <div className='w-[50%] flex justify-center items-center flex-col bg-white  shadow-2xl'>
        <h1 className='text-3xl font-bold mb-10 text-gray-800 self-start w-1/3 p-6'>All Goals</h1>
{      props.goals.length > 0 ?
    props.goals.map((goal,i) => {
        console.log(goal)
        return  <Goal key={i} goal={goal} />
    })
    :<h1>No Goals</h1>}
    </div>
    </div>
  )
}

export default AllGoals
