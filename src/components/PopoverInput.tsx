import React, { useState } from 'react'
import { editTask } from '../features/tasks/services/index'
import { ITask, TaskType } from '../features/tasks/services/index'
import { SpinnerCircular } from 'spinners-react'
type Props = {
	title: string
	handleClose: Function
	boardType: TaskType
	taskID: number
	setTasks: Function
}

const PopoverInput = (props: Props) => {
	const [editedTask, setEditedTask] = useState<string>('')
	const [loading, setLoading] = useState(false)
	const getEditedTaskFromServer = async () => {
		setLoading(true)
		const EditedTaskFromServer = await editTask({ title: editedTask, type: props.boardType }, props.taskID)
		props.setTasks((prevState: ITask[]) =>
			prevState.filter(task =>
				task.ID === props.taskID
					? ((task.title = EditedTaskFromServer.title), (task.type = EditedTaskFromServer.type))
					: task
			)
		)
		props.handleClose()
		setLoading(false)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (editedTask !== props.title && editedTask !== '') {
			getEditedTaskFromServer()
		}
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedTask(e.target.value)
	}
	return (
		<form className='popover__box' onSubmit={handleSubmit}>
			<label htmlFor='popover-input' className='popover__label'>
				edit task
			</label>
			<input
				className='popover__input task'
				id='popover-input'
				type='text'
                autoFocus
				defaultValue={props.title}
				onChange={handleChange}
			/>
			<button className='popover__btn' type='submit'>
				{loading ? <SpinnerCircular secondaryColor='rgba(235, 236, 240, 255)' size='20' /> : 'edit'}
			</button>
		</form>
	)
}

export default PopoverInput
