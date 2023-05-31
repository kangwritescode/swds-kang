import { Card, Grid, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/task';
import { TaskStatus } from '../shared/types';
import TaskColumn from './TaskColumn';

function Kanban() {
    const { isLoading, error, data } = useQuery(['tasks'], getTasks);
    const statuses: TaskStatus[] = ["Pending", "In Progress", "Deleted", "Closed"]
    return (
        <Card sx={{ py: 3, pl: 3, mt: 8, borderRadius: 5, bgcolor: '#f4f4f4' }}>
            <Typography
                pb={2}
                variant='h4'
                fontWeight='bold'>
                Kanban
            </Typography>
            <Grid container>
                {statuses.map((status, i) => {
                    const statusNum = i + 1;
                    const columnData = data?.filter(task => task.status === statusNum)
                    return (
                        <TaskColumn
                            key={status}
                            status={status}
                            statusNum={statusNum}
                            data={columnData}
                        />
                    )
                })}
            </Grid>
        </Card>
    )
}

export default Kanban