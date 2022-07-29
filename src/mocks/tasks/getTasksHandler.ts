import { rest } from 'msw';
import { ITask } from '../../features/tasks/services';

const DATA: ITask[] = [
    {
        ID: 0,
        title: 'My First Task',
        type: 'to_do'
    },
    {
        ID: 1,
        title: 'My Second Task',
        type: 'in_progress'
    },
    {
        ID: 2,
        title: 'My third task',
        type: 'done'
    }
];

export const getTasksHandler = rest.get<never, never, ITask[]>(
    `http://localhost:5000/tasks`,
    (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.json(DATA)
        );
    }
)
// export const getTasksHandler = rest.get(
//     `http://localhost:5000/tasks`,
//     (_:never, res:never, ctx:ITask[]) => {
//         return res(
//             ctx.status(200),
//             ctx.delay(500),
//             ctx.json(DATA)
//         );
//     }
// )