import {FaTimes} from 'react-icons/fa'

export default function Task({id, task, onDelete,onToggle}) {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>{onToggle(id)}}>
        <h3>{task.text} <FaTimes style={{color: 'red'}} onClick={()=>{onDelete(id)}}/></h3>
        <p>{task.day}</p>
    </div>
  )
}
