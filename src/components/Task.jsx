import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

export function Task({taskComplete=false, ...props}) {
  return(
    <div className={styles.task}>
      <input type='checkbox' checked={taskComplete} onChange={() => props.handleCheckboxClick(props.taskDesc)}/>
      <span>{props.taskDesc}</span>
      <button onClick={() => props.handleDeleteTask(props.taskDesc)}>
        <Trash size={16} color={"var(--gray-300)"}/>
      </button>
    </div>
  )
}