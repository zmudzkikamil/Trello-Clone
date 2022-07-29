import { ITask, TaskType } from ".";

export interface IEditTaskVariables {
    title: string;
    type: TaskType;
}

// TODO: PUT Data & Return single ITask
export const editTask = async (variables: IEditTaskVariables, id:number): Promise<ITask> => {
const res = await fetch(`http://localhost:5000/tasks/${id}`, {method:'PUT', headers:{'Content-type':'application/json'}, body:JSON.stringify(variables)})
const data = await res.json()
return data
}