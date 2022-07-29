import { rest } from 'msw';
import { ITask } from '../../features/tasks/services';
import { IEditTaskVariables } from '../../features/tasks/services/editTask';

interface EditTaskHandlerParams {
    ID: string;
} 

export const editTaskHandler = rest.put<IEditTaskVariables, EditTaskHandlerParams, ITask>(
    `http://localhost:5000/tasks/:ID`,
    async (req, res, ctx) => {
        const { ID } = req.params;
        const { title, type } = await req.json<IEditTaskVariables>();

        return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.json({
                ID: parseInt(ID),
                title,
                type
            })
        );
    }
);