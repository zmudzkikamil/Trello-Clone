import { ITask, TaskType } from '../features/tasks/services'
import DropdownMenu from './DropdownMenu'
import { FormEvent, useRef } from 'react'
type Props = {
	title: string
	setTasks: Function
	tasks: ITask[]
	boardType: TaskType
	setAddTask: Function
}
const Header = (props: Props) => {
	const blurInput:any = useRef<any>(null)

	const blur = (e:FormEvent<HTMLFormElement>) => {
		blurInput.current.blur()
		e.preventDefault()
	}
	return (
		<form onSubmit={blur} className='board__header-box'>
			<input ref={blurInput} defaultValue={props.title} className='board__header-title'></input>

			<DropdownMenu
				setAddTask={props.setAddTask}
				boardType={props.boardType}
				tasks={props.tasks}
				setTasks={props.setTasks}
			/>
		</form>
	)
}

export default Header
