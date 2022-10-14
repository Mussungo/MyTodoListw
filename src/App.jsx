import { useState } from 'react'
import styles from './App.module.css'
import { Header } from './components/Header'
import { ClipboardText } from 'phosphor-react'
import { nanoid } from 'nanoid'

import './global.css'
import { Task } from './components/Task'
import { render } from 'react-dom'

export function App() {
  const [tasks, setTasks] = useState([{}])
  const [newTask, setNewTask] = useState('')
  const [createdTaskCount, setCreatedTaskCount] = useState(0)
  const [completedTaskCount, setCompletedTaskCount] = useState(0)

  function handleNewTaskChange(event) {
    setNewTask(event.target.value)
  }

  function handleCreateNewTask(event, taskDesc) {
    event.preventDefault()
    setTasks(prevTasks => {return(createdTaskCount > 0 ? [...prevTasks, {id: nanoid(), taskDesc: newTask, isComplete: false}] : [{id: nanoid(), taskDesc: newTask, isComplete: false}])})
    setCreatedTaskCount(createdTaskCount + 1)
    setNewTask('')
  }

  function handleDeleteTask(id) {
    const tasksWithoutDeleted = tasks.filter(task => task.id !== id)
    setCreatedTaskCount(createdTaskCount - 1)
    setTasks(tasksWithoutDeleted)
  }

  function handleCheckboxClick(id) {
    setTasks(tasks.map(task => {
        return(id === task.id ? {
          ...task,
          isComplete: true
        } : task)
      }))
    setCompletedTaskCount(completedTaskCount + 1)
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
              <Task key={task.id} id={task.id} taskDesc={task.taskDesc} taskComplete={task.isComplete} handleDeleteTask={handleDeleteTask} handleCheckboxClick={handleCheckboxClick}/>
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
            <p>Concluidas <span>{completedTaskCount} de {createdTaskCount}</span></p>
          </header>
          <div className={styles.tasks}>
            {renderTask()}
          </div>
        </div>
      </div>
    </>
  )
}