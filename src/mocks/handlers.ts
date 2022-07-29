import { RequestHandler } from "msw";
import { createTaskHandler } from "./tasks/createTaskHandler";
import { deleteTaskHandler } from "./tasks/deleteTaskHandler";
import { editTaskHandler } from "./tasks/editTaskHandler";
import { getTasksHandler } from "./tasks/getTasksHandler";

export const handlers: RequestHandler[] = [
    getTasksHandler,
    createTaskHandler,
    editTaskHandler,
    deleteTaskHandler
];