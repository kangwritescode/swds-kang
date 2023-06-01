import { useMemo, useState } from 'react';
import {
    Box,
    Grid,
    IconButton,
    Modal,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SortIcon from '@mui/icons-material/Sort';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import { Task, Tasks } from '../shared/types';
import { compareDates, generateRandomPastelColor } from '../shared/utils';

interface TaskColumnProps {
    columnData?: Tasks;
    statusNum: number;
    statusText: string;
}

function TaskColumn({ statusText, statusNum, columnData }: TaskColumnProps) {
    // State
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sortMode, setSortMode] = useState<'asc' | 'desc'>('asc');
    const [formType, setFormType] = useState<'create' | 'edit'>('create');
    const [formInitialValues, setFormInitialValues] = useState<
        Task | undefined
    >({ status: statusNum });

    // Hooks
    const pastelColor = useMemo(() => generateRandomPastelColor(), []);

    // Handlers
    const onClickAddTask = () => {
        setFormInitialValues({ status: statusNum });
        setFormType('create');
        setModalIsOpen(true);
    };
    const reverseSortMode = () => {
        if (sortMode === 'asc') {
            return setSortMode('desc');
        }
        setSortMode('asc');
    };
    const editTask = (task: Task) => {
        setFormType('edit');
        setFormInitialValues(task);
        setModalIsOpen(true);
    };

    // Column Data
    const sortedColumnData = useMemo(() => {
        if (sortMode === 'asc') {
            return columnData?.sort((a, b) =>
                compareDates(
                    new Date(a?.createdAt || ''),
                    new Date(b?.createdAt || '')
                )
            );
        }
        return columnData?.sort((a, b) =>
            compareDates(
                new Date(b?.createdAt || ''),
                new Date(a?.createdAt || '')
            )
        );
    }, [columnData, sortMode]);

    return (
        <>
            <Grid item xs={3} key={statusText}>
                <Stack direction="column" marginRight={3}>
                    <Box
                        pb={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography fontWeight="bold" color={pastelColor}>
                            {statusText}
                        </Typography>
                        <Stack direction="row">
                            <Tooltip title="Sort by Date Created">
                                <IconButton
                                    sx={{
                                        marginRight: -1,
                                        transform:
                                            sortMode === 'desc'
                                                ? 'scaleY(-1)'
                                                : '',
                                    }}
                                    onClick={() => reverseSortMode()}
                                >
                                    <SortIcon />
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                sx={{ marginRight: -1 }}
                                onClick={() => onClickAddTask()}
                            >
                                <AddCircleOutlinedIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                    {sortedColumnData?.map((task) => (
                        <TaskCard onClick={editTask} task={task} />
                    ))}
                </Stack>
            </Grid>
            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <TaskForm
                    type={formType}
                    initialValues={formInitialValues}
                    onClose={() => setModalIsOpen(false)}
                />
            </Modal>
        </>
    );
}

export default TaskColumn;
