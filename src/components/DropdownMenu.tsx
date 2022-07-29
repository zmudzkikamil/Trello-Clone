import { Dropdown, Menu } from 'antd'
import { BsThreeDots } from 'react-icons/bs'
import { ITask, TaskType } from '../features/tasks/services'

type Props = {
	setTasks: Function
  tasks : ITask[]
  boardType: TaskType
  setAddTask : Function
}

const DropdownMenu = function (props: Props) {
	const deleteAllHandler = () => {
		props.setTasks((prevState: ITask[]) => prevState.filter(task => task.type !== props.boardType))
	}
  const addTaskHandler = () => {
		props.setAddTask(true)
	}
	return (
		<Dropdown
			overlay={
				<Menu
					items={[
						{
							label: <a onClick={addTaskHandler} href='#0'>add new task...</a>,
							key: '1',
						},
						{
							type: 'divider',
						},
						{
							label: <a onClick={deleteAllHandler} href='#0'>delete all tasks...</a>,
							key: '2',
						},
					]}
				/>
			}
			trigger={['click']}>
			<BsThreeDots
				size={30}
				className='board__header-btn--options on-hover'
				style={{ fontSize: '20px' }}
				onClick={e => e.preventDefault()}
			/>
		</Dropdown>
	)
}

export default DropdownMenu
