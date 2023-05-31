import { Box, Card, Divider, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Task, Tasks } from '../shared/types'
import { generateRandomPastelColor } from '../shared/utils';
import { useState } from 'react';
import TaskForm from './TaskForm';

interface TaskColumnProps {
    statusText: string,
    statusNum: number,
    columnData?: Tasks,
}

function TaskColumn({ statusText, statusNum, columnData }: TaskColumnProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formType, setFormType] = useState<'create' | 'edit'>('create');
    const [formInitialValues, setFormInitialValues] = useState<Task | undefined>({status: statusNum});

    const onClickAddTask = () => {
        setFormType('create');
        setModalIsOpen(true);
    }

    const onClickTask = (task: Task) => {
        setFormType('edit');
        setFormInitialValues(task);
        setModalIsOpen(true);
    }

    return (
        <>
            <Grid item xs={3} key={statusText}>
                <Stack direction='column' marginRight={3}>
                    <Box
                        pb={1}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Typography
                            fontWeight='bold'
                            color={generateRandomPastelColor()}>
                            {statusText}
                        </Typography>
                        <IconButton sx={{ marginRight: -1 }} onClick={() => onClickAddTask()}>
                            <AddCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                    {columnData?.map(task => (
                        <Card
                            key={task.id}
                            onClick={() => onClickTask(task)}
                            sx={{
                                padding: 2,
                                borderRadius: 3,
                                marginBottom: 2,
                                ':hover': {
                                    cursor: 'pointer',
                                    background: '#fbfbfb'
                                },
                                ':active': {
                                    background: '#f4f4f4'
                                }
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
                        </Card>
                    ))}
                </Stack>
            </Grid>
            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <TaskForm
                    type={formType}
                    initialValues={formInitialValues}
                    onClose={() => setModalIsOpen(false)}
                />
            </Modal>
        </>
    )
}

export default TaskColumn