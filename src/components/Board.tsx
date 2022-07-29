import Footer from './Footer'
import Header from './Header'
import Tasks from './Tasks'
import { editTask } from '../features/tasks/services/index'
import { useState } from 'react'
import { ITask, TaskType, ICreateTaskVariables, createTask } from '../features/tasks/services/index'


type Props = {
	tasks: ITask[]
	title: string
	type: TaskType
	setTasks: Function
	setShadow: Function
	boardID: number
	boards: { title: string; type: TaskType; boardID: number }[]
}
interface ITaskWithIndex {
	title: string
	ID: number
	index: number
	type:TaskType
}
const Board = (props: Props) => {
	const [addTask, setAddTask] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [loading, setLoading] = useState(false)

	const createTaskHandler = async (newTask: ICreateTaskVariables) => {
		setLoading(true)
		const taskFromServer = await createTask(newTask)
		props.setTasks((prevState: ITask[]) => [...prevState, taskFromServer])
		setLoading(false)
		setInputValue('')
	}

	const AddTaskHandler = () => {
		setAddTask(!addTask)
	}
	const onDrop = async (task:ITaskWithIndex, type: TaskType) => {
		const EditedTaskFromServer = await editTask({ title: task.title, type: type }, task.ID)
		props.setTasks((prevState: ITask[]) =>
			prevState.filter(prev => (prev.ID === task.ID ? (prev.type = EditedTaskFromServer.type) : task))
		)
		
	}

	const moveTask = (dragIndex: number, hoverIndex: number) => {
		const task = props.tasks[dragIndex]
		props.setTasks((prevState: ITask[]) => {
			const newTasks = prevState.filter((prev: ITask, idx: number) => idx !== dragIndex)
			newTasks.splice(hoverIndex, 0, task)
			return [...newTasks]
		})
	}
	return (
		<div className='board'>
			<Header
				setAddTask={setAddTask}
				boardType={props.type}
				tasks={props.tasks}
				setTasks={props.setTasks}
				title={props.title}
			/>
			<Tasks
				boards={props.boards}
				setTasks={props.setTasks}
				inputValue={inputValue}
				setInputValue={setInputValue}
				addTask={addTask}
				tasks={props.tasks}
				boardType={props.type}
				setShadow={props.setShadow}
				onDrop={onDrop}
				moveTask={moveTask}
			/>
			<Footer
				setInputValue={setInputValue}
				loading={loading}
				createTaskHandler={createTaskHandler}
				inputValue={inputValue}
				addTask={addTask}
				onAdd={AddTaskHandler}
				boardType={props.type}
			/>
		</div>
	)
}

export default Board
