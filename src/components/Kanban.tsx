import { Box, Card, Grid, Modal, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/task';
import { TaskStatus } from '../shared/types';
import TaskColumn from './TaskColumn';
import TaskForm from './CreateTaskForm';
import { useState } from 'react';

const statuses: TaskStatus[] = ["Pending", "In Progress", "Deleted", "Closed"]

function Kanban() {
    const { isLoading, error, data } = useQuery({ queryKey: ['tasks'], queryFn: getTasks });

    return (
        <>
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
                                statusText={status}
                                statusNum={statusNum}
                                columnData={columnData}
                            />
                        )
                    })}
                </Grid>
            </Card>
        </>
    )
}

export default Kanban