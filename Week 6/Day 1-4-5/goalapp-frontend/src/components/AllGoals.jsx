import React, {useEffect} from 'react'
import Goal from './Goal'
import { useNavigate } from 'react-router-dom'

const AllGoals = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    const getGoals = async () => {
    let token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5000/api/goals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })

    const json = await response.json()
    props.setGoals(json)
  }
  getGoals()
  }, [])
  return (
      <div className=' flex justify-center items-center flex-col w-full pt-[10%]'>
        <div className='w-[50%] flex justify-center items-center flex-col bg-white  shadow-2xl'>
        <h1 className='text-3xl font-bold mb-10 text-gray-800 self-start w-1/3 p-6'>All Goals</h1>
{      props.goals.length > 0 ?
    props.goals.map((goal,i) => {
        return  <Goal key={i} id={goal.id}  goal={goal} removeGoal={props.removeGoal} updateGoalCall ={props.updateGoalCall} />
    })
    :<h1>No Goals</h1>}
    </div>
    </div>
  )
}

export default AllGoals
