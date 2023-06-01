import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    useTheme,
    Typography,
    IconButton
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { type Task } from '../shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, postTask, putTask } from '../api/task';

const schema = z.object({
    task: z.string().nonempty({ message: 'Task is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    status: z.number(),
});

interface TaskFormProps {
    onClose: () => void;
    type: 'create' | 'edit';
    initialValues?: Task;

}

const TaskForm = ({ onClose, initialValues, type }: TaskFormProps) => {

    // Hooks
    const theme = useTheme();
    const queryClient = useQueryClient()
    const {
        handleSubmit,
        register,
        formState: { errors },
        control: formControl
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: initialValues
    });

    // Mutations
    const createTask = useMutation({
        mutationFn: postTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
    const updateTask = useMutation({
        mutationFn: (task: Task) => putTask(task, initialValues?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
    const removeTask = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })

    // Functions
    const onSubmit = (task: Task) => {
        if (type === 'edit') {
            updateTask.mutate(task);
        } else {
            createTask.mutate(task);
        }
        onClose();
    };
    const onDelete = () => {
        removeTask.mutate(initialValues?.id);
        onClose();
    }

    return (
        <Box sx={{
            borderRadius: 2,
            height: '100vh',
            width: '100vw',
            margin: '0 auto',
            padding: theme.spacing(3),
            background: theme.palette.background.paper,
            position: 'relative',
            '@media (min-width: 600px)': {
                width: 400,
                height: 'unset',
            }
        }}>
            <Box width='100%' display='flex' justifyContent='flex-end'>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Typography
                variant='h5'
                color={theme.palette.text.primary}
                textAlign='center'
                mb={2}>
                {type === 'create' ? 'Create Task' : 'Edit Task'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit((formValues) => onSubmit(formValues as Task))} sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiFormControl-root': {
                    marginBottom: theme.spacing(2),
                },
            }}>
                <TextField
                    {...register('task')}
                    placeholder="Task"
                    variant="outlined"
                    error={!!errors.task}
                    inputProps={{ maxLength: 10 }}
                />
                <TextField
                    {...register('description')}
                    placeholder="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    inputProps={{ maxLength: 500 }}
                    error={!!errors.description}
                />
                <Controller
                    control={formControl}
                    name='status'
                    render={({ field }) => {
                        return (
                            <FormControl>
                                <InputLabel id="select-label">Status</InputLabel>
                                <Select
                                    {...field}
                                    labelId="status-label"
                                    label="Status"
                                >
                                    <MenuItem value={1}>Pending</MenuItem>
                                    <MenuItem value={2}>In Progress</MenuItem>
                                    <MenuItem value={3}>Deleted</MenuItem>
                                    <MenuItem value={4}>Closed</MenuItem>
                                </Select>
                                {errors.status && <span>{errors.root?.message}</span>}
                            </FormControl>
                        )
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='large'>
                    {type === 'create' ? 'Create Task' : 'Edit Task'}
                </Button>
                {type === 'edit' && (
                    <Button
                        onClick={onDelete}
                        variant="outlined"
                        color="error"
                        size='large'
                        sx={{ mt: 2 }}>
                        Delete Task
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default TaskForm;
