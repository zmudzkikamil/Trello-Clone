import { rest } from 'msw';
import { ITask } from '../../features/tasks/services';
import { ICreateTaskVariables } from '../../features/tasks/services/createTask';

let lastID = 1000;

export const createTaskHandler = rest.post<ICreateTaskVariables, never, ITask>(
    `http://localhost:5000/tasks`,
    async (req, res, ctx) => {
        const { title, type } = await req.json<ICreateTaskVariables>();
        lastID++;

        return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.json({
                ID: lastID,
                title,
                type
            })
        );
    }
);