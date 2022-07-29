export interface ITask {
    ID: number;
    title: string;
    type: TaskType;
}

export type TaskType = 'to_do' | 'in_progress' | 'done';

// TODO: GET Data & Return ITask array
export const fetchTasks = async (): Promise<ITask[]> => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
}