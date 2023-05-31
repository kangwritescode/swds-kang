import { Box, Card, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Tasks } from '../shared/types'
import { generateRandomPastelColor } from '../shared/utils';

interface TaskColumnProps {
    status: string,
    statusNum: number,
    data?: Tasks
}

function TaskColumn({ status, statusNum, data }: TaskColumnProps) {
    return (
        <Grid item xs={3} key={status}>
            <Stack direction='column' marginRight={3}>
                <Box pb={1} display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography fontWeight='bold' color={`${generateRandomPastelColor()}`}>
                        {status}
                    </Typography>
                    <IconButton sx={{ marginRight: -1 }}>
                        <AddCircleOutlinedIcon />
                    </IconButton>
                </Box>
                {data?.map(task => (
                    <Card
                        key={task.id}
                        sx={{
                            padding: 2,
                            borderRadius: 3,
                            marginBottom: 2,
                        }}>
                        <Typography
                            key={task.id}
                            pb={1}
                            fontWeight='bold'
                            variant='overline'
                            lineHeight={0}
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
    )
}

export default TaskColumn