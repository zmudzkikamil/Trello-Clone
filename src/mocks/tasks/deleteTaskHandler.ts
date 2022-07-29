import { rest } from 'msw';

interface DeleteTaskHandlerParams {
    ID: string;
}

export const deleteTaskHandler = rest.delete<never, DeleteTaskHandlerParams>(
    `http://localhost:5000/tasks/:ID`,
    async (_, res, ctx) => {
        return res(
            ctx.status(200)
        );
    }
);