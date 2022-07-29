import { ITask, TaskType } from ".";

export interface ICreateTaskVariables {
    title: string;
    type: TaskType;
}

// TODO: POST Data & Return single ITask
export const createTask = async (variables: ICreateTaskVariables): Promise<ITask> => {
const res = await fetch(`http://localhost:5000/tasks/`, {method:'POST',headers:{'Content-type':'application/json'},body:JSON.stringify(variables)})
const data = await res.json()
return data
}