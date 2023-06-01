import { Card, Divider, Typography } from '@mui/material'
import { Task } from '../shared/types'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import CardButton from './CardButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTask } from '../api/task';

interface TaskCardProps {
    task: Task
    onClick: (task: Task) => void
}

function TaskCard({ task, onClick }: TaskCardProps) {

    // Hooks
    const queryClient = useQueryClient()

    // Mutations
    const updateTask = useMutation({
        mutationFn: (updatedTask: Task) => putTask(updatedTask, task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })

    // Handlers
    const onClickMoveCardLeft = (task: Task) => {
        const updatedTask = {
            task: task.task,
            status: task.status - 1,
            description: task.description
        }
        updateTask.mutate(updatedTask)
    }
    const onClickMoveCardRight = (task: Task) => {
        const updatedTask = {
            description: task.description,
            status: task.status + 1,
            task: task.task
        }
        updateTask.mutate(updatedTask)
    }

    return (
        <Card
            key={task.id}
            sx={{
                position: 'relative',
                padding: 2,
                borderRadius: 3,
                marginBottom: 2,
                ':hover': {
                    cursor: 'pointer',
                },
            }}>
            <Typography
                key={task.id}
                fontWeight='bold'
                variant='overline'
                lineHeight={2}
                fontSize={14}>
                {task.task}
            </Typography>
            <Divider />
            <Typography
                variant='body2'
                pt={1}>
                {task.description}
            </Typography>
            <Card sx={{
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
                height: '100%',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                ':hover': {
                    background: '#ffffff9e',
                    opacity: 1,
                },
            }}>
                {task?.status !== 1 && (
                    <CardButton onClick={() => onClickMoveCardLeft(task)}>
                        <KeyboardArrowLeftIcon fontSize='large' />
                    </CardButton>
                )}
                <CardButton onClick={() => onClick(task)}>
                    <EditIcon fontSize='large' />
                </CardButton>
                {task?.status !== 4 && (
                    <CardButton onClick={() => onClickMoveCardRight(task)}>
                        <KeyboardArrowRightIcon fontSize='large' />
                    </CardButton>
                )}
            </Card>
        </Card>
    )
}

export default TaskCard