export interface Task {
    createdAt?: string;
    description?: string;
    id?: number;
    status?: number;
    task?: string;
    updatedAt?: string;
}

export type Tasks = Task[];

export type TaskStatus = 'Pending' | 'In Progress' | 'Deleted' | 'Closed';

