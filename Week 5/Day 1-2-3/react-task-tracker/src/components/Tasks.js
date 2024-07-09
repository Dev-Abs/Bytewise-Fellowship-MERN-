import Task from './Task'
export default function Tasks({tasks,onDelete,onToggle}) {
  return (
    <>
        {tasks.map((task) => (
            <Task id={task.id} key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        ))}
    </>
  )
}
