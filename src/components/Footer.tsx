import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { BsPlus } from 'react-icons/bs'
import { TaskType } from '../features/tasks/services'
import { SpinnerCircular } from 'spinners-react'

type Props = {
	onAdd: VoidFunction
	addTask: boolean
	inputValue: string
	boardType: TaskType
	createTaskHandler: Function
	loading: boolean
	setInputValue: Function
}

const Footer: React.FC<Props> = ({
	setInputValue,
	loading,
	onAdd,
	addTask,
	inputValue,
	boardType,
	createTaskHandler,
}) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		inputValue && createTaskHandler({ title: inputValue, type: boardType })
		setInputValue('')}
	return (
		<>
			{addTask ? (
				<form onSubmit={handleSubmit} id="task-form" className='board__footer'>
					<button type='submit' className='board__footer-btn--approve'>
						{loading ? <SpinnerCircular secondaryColor='rgba(235, 236, 240, 255)' size='20' /> : 'Add Task'}
					</button>
					<button
						onClick={() => {
							onAdd()
							setInputValue('')
						}}
						className='board__footer-btn--decline'>
						<RiCloseLine />
					</button>
				</form>
			) : (
				<div onClick={onAdd} className='board__footer on-hover'>
					<button className='board__footer-btn--add'>
						<BsPlus />
					</button>
					<div className='board__footer-text'>Add a task</div>
				</div>
			)}
		</>
	)
}

export default Footer
