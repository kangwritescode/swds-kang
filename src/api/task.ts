import axios from "axios";
import { Task, type Tasks } from "../shared/types"

export const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost:8002/api/v1/task');
        return response.data as Tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (task: Task) => {
    try {
        const response = await axios.post('http://localhost:8002/api/v1/task', task);
        return response.data as Task;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}