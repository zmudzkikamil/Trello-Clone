import { ITask, TaskType } from ".";

export interface IEditTaskVariables {
    title: string;
    type: TaskType;
}

// TODO: PUT Data & Return single ITask
export const editTask = async (variables: IEditTaskVariables): Promise<ITask> => {

}