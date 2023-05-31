import { Box, Card, Divider, Typography } from '@mui/material'
import { Task } from '../shared/types'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import EditIcon from '@mui/icons-material/Edit';

interface TaskCardProps {
    task: Task
    onClick: (task: Task) => void
}

function TaskCard({ task, onClick }: TaskCardProps) {
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
                pb={1}
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
                <Box
                    height='100%'
                    flexGrow={1}
                    alignItems='center'
                    justifyContent='center'
                    display='flex'
                    sx={{
                        opacity: 0.5,
                        ':hover': {
                            opacity: 1,
                        },
                    }}>
                    <KeyboardArrowLeftIcon fontSize='large' />
                </Box>
                <Box
                    onClick={() => onClick(task)}
                    height='100%'
                    flexGrow={1}
                    alignItems='center'
                    justifyContent='center'
                    display='flex'
                    sx={{
                        opacity: 0.5,
                        ':hover': {
                            opacity: 1,
                        },
                    }}>
                    <EditIcon fontSize='large' />
                </Box>
                <Box
                    height='100%'
                    flexGrow={1}
                    alignItems='center'
                    justifyContent='center'
                    display='flex'
                    sx={{
                        opacity: 0.5,
                        ':hover': {
                            opacity: 1,
                        },
                    }}>
                    <KeyboardArrowRightIcon fontSize='large' />
                </Box>
            </Card>
        </Card>
    )
}

export default TaskCard