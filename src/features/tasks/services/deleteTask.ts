// TODO: DELETE Data
// http://localhost:5000/tasks/1
export const deleteTask = async (id:string): Promise<void> => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
}