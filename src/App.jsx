import { useState } from 'react'
import styles from './App.module.css'
import { Header } from './components/Header'
import { ClipboardText } from 'phosphor-react'

import './global.css'
import { Task } from './components/Task'
import { render } from 'react-dom'

export function App() {
  const [tasks, setTasks] = useState([{taskDesc: "Lorem lorem lorem lorem lorem lorem", isComplete: false}])
  const [newTask, setNewTask] = useState('')
  const [createdTaskCount, setCreatedTaskCount] = useState(1)

  function handleNewTaskChange(event) {
    setNewTask(event.target.value)
  }

  function handleCreateNewTask(event, taskDesc) {
    event.preventDefault()
    setTasks(prevTasks => {return([...prevTasks, {taskDesc: newTask, isComplete: false}])})
    setCreatedTaskCount(createdTaskCount + 1)
    setNewTask('')
  }

  function handleDeleteTask(taskDesc) {
    const tasksWithoutDeleted = tasks.filter(task => task.taskDesc !== taskDesc)
    setCreatedTaskCount(createdTaskCount - 1)
    setTasks(tasksWithoutDeleted)
  }

  function handleCheckboxClick(taskDesc) {
    setTasks(tasks.map(task => {
        return(taskDesc === task.taskDesc ? {
          ...task,
          isComplete: true
        } : task)
      }))
  }

  function renderTask() {
    if(createdTaskCount <= 0){
      return(
        <div className={styles.tasks}>
          <ClipboardText size={40} color={'var(--gray-300)'}/>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      )
    }else {
      return(
        tasks.map(task => {
          return(
            <div className={styles.tasks}>
              <Task key={task.taskDesc} taskDesc={task.taskDesc} taskComplete={task.isComplete} handleDeleteTask={handleDeleteTask} handleCheckboxClick={handleCheckboxClick}/>
            </div>
          )
        }
        )
      )
    }
  }



  return(
    <>
      <Header />

      <div className={styles.taskContainer}>
        <form onSubmit={handleCreateNewTask}>
          <input type="text" name='taskDesc' value={newTask} onChange={handleNewTaskChange} />
          <button type='submit'>Criar</button>
        </form>

        <div className={styles.taskWrapper}>
          <header>
            <p>Tarefas Criadas <span>{createdTaskCount}</span></p>
            <p>Concluidas <span>0</span></p>
          </header>
          {renderTask()}
        </div>
      </div>
    </>
  )
}