import 'antd/dist/antd.css'
import './Trello.css'
import { ITask, TaskType } from './features/tasks/services/fetchTasks'
import { fetchTasks } from './features/tasks/services'
import React, { useEffect, useState } from 'react'
import Board from './components/Board'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const Trello: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [shadow, setShadow] = useState<boolean>(false)
	const [boards, ] = useState<{ title: string; type: TaskType; boardID: number }[]>([
		{ title: 'To do', type: 'to_do', boardID: 1 },
		{ title: 'In progress', type: 'in_progress', boardID: 2 },
		{ title: 'Done', type: 'done', boardID: 3 },
	])
	useEffect(() => {
		const getTasks = async () => {
			const dataFromServer = await fetchTasks()
			setTasks(() => tasks.concat(dataFromServer))
		}
		getTasks()
	}, [])
	return (
		<DndProvider backend={HTML5Backend}>
			<div className='wrapper'>
				{boards.map(board => (
					<Board
						key={board.boardID}
						boards={boards}
						boardID={board.boardID}
						title={board.title}
						type={board.type}
						tasks={tasks}
						setTasks={setTasks}
						setShadow={setShadow}
					/>
				))}
				<div className={shadow ? 'wrapper-shadow' : 'hide'}></div>
			</div>
		</DndProvider>
	)
}

export default Trello
