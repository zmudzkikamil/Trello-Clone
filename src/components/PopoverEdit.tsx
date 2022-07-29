import * as React from 'react'
import Popover from '@mui/material/Popover'
import { MdEdit } from 'react-icons/md'
import PopoverInput from './PopoverInput'
import { TaskType } from '../features/tasks/services/index'
type Props = {
	setShadow:Function
	title:string
	boardType: TaskType
	taskID: number
	setTasks:Function
}

export default function PopoverEdit(props:Props) {
	const [anchorEl, setAnchorEl] = React.useState<SVGElement | null>(null)

	const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
		props.setShadow(true)
	}

	const handleClose = () => {
		setAnchorEl(null)
		props.setShadow(false)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<div className='board__task-options'>
			<MdEdit
				aria-describedby={id}
				onClick={handleClick}
				className='board__task-options--edit button on-hover'
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}><PopoverInput setTasks={props.setTasks} taskID={props.taskID} boardType={props.boardType} handleClose={handleClose} title={props.title}/></Popover>
		</div>
	)
}
