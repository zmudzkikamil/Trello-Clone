import TextareaAutosize from 'react-textarea-autosize'
import { ItemTypes } from '../data/DragTypes'
import React from 'react'
import Task from './Task'
import { ITask, TaskType } from '../features/tasks/services/index'
import { useDrop } from 'react-dnd'
type Props = {
	tasks: ITask[]
	boardType: TaskType
	addTask: boolean
	setInputValue: Function
	inputValue: string
	setShadow: Function
	setTasks: Function
	onDrop: Function
	moveTask: Function
	boards: { title: string; type: TaskType; boardID: number }[]
}

const Tasks = (props: Props) => {
	const newTaskValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.setInputValue(e.target.value)
	}
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (task, monitor) => {
			props.onDrop(task, props.boardType)
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
		}),
	})

	return (
		<div
			className='board__tasks'
			ref={drop}
			style={{ backgroundColor: isOver ? 'rgba(210, 210, 215, 255)' : 'rgba(235, 236, 240, 255)' }}>
			{props.tasks.map((task, index) =>
				task.type === props.boardType ? (
					<Task
						key={task.ID}
						task={task}
						setTasks={props.setTasks}
						boardType={props.boardType}
						index={index}
						type={task.type}
						taskID={task.ID}
						title={task.title}
						setShadow={props.setShadow}
						moveTask={props.moveTask}
					/>
				) : null
			)}
			{props.addTask && (
				<TextareaAutosize
					value={props.inputValue}
					onChange={newTaskValueHandler}
					className='task board__task--add'
					placeholder='Enter a title for this card…'
					style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', border: 'none' }}
				/>
			)}
		</div>
	)
}

export default Tasks
