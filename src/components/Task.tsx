import { RiCloseLine } from 'react-icons/ri'
import PopoverEdit from './PopoverEdit'
import { deleteTask } from '../features/tasks/services/index'
import { ITask, TaskType } from '../features/tasks/services/index'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import React, { useRef } from 'react'
import { ItemTypes } from '../data/DragTypes'

type Props = {
	title: string
	setShadow: Function
	boardType: TaskType
	taskID: number
	setTasks: Function
	type: TaskType
	index: number
	moveTask: Function
	task: ITask
}
export interface ITaskProps {
	ID: number
	index: number
	title: string
	type: TaskType
}

const Task: React.FC<Props> = ({ task, title, setShadow, boardType, taskID, setTasks, type, index, moveTask }) => {
	const ref = useRef<HTMLDivElement>(null)

	const [{ handlerId }, drop] = useDrop<ITaskProps, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.TASK,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(task, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = task.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveTask(dragIndex, hoverIndex)
			task.index = hoverIndex
		},
	})
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.TASK,
		item: { ...task, index },
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const deleteTaskFromServer = async () => {
		await deleteTask(taskID.toString())
		setTasks((prevState: ITask[]) => prevState.filter(task => task.ID !== taskID))
	}
	drag(drop(ref))
	return (
		<div
			data-handler-id={handlerId}
			ref={ref}
			className='board__task task'
			id={taskID.toString()}
			style={{ opacity: isDragging ? 0 : 1 }}>
			<div className='board__task-title'>{title}</div>
			<div className='board__task-options'>
				<PopoverEdit setTasks={setTasks} taskID={taskID} boardType={boardType} title={title} setShadow={setShadow} />
				<div className='board__task-options'>
					<RiCloseLine className='board__task-options--delete button on-hover' onClick={deleteTaskFromServer} />
				</div>
			</div>
		</div>
	)
}

export default Task
