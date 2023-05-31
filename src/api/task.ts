import { Tasks } from "../shared/types"

export const getTasks = async () => {
    const response = await fetch('http://localhost:8002/api/v1/task')
    const data: Tasks = await response.json()
    return data;
}