import axios, { AxiosError } from 'axios';
import { Task, type Tasks } from '../shared/types';
import { toast } from 'react-hot-toast';

export const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost:8002/api/v1/task');
        return response.data as Tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const postTask = async (task: Task) => {
    try {
        const response = await axios.post(
            'http://localhost:8002/api/v1/task',
            task
        );
        toast.success('Task created successfully');
        return response.data as Task;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message.text);
        }
        throw error;
    }
};

export const putTask = async (task: Task, id?: number) => {
    try {
        const response = await axios.put(
            `http://localhost:8002/api/v1/task/${id}`,
            task
        );
        toast.success('Task updated successfully');
        return response.data as Task;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message.text);
        }
        throw error;
    }
};

export const deleteTask = async (id?: number) => {
    try {
        const response = await axios.delete(
            `http://localhost:8002/api/v1/task/${id}`
        );
        toast.success('Task deleted successfully');
        return response.data as Task;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message.text);
        }
        throw error;
    }
};
