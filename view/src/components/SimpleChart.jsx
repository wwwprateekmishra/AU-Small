import { Box, Stack, Typography } from "@mui/material"

const SimpleChart = (props) => {
    return (
        <Stack direction='row' sx={{ backgroundColor: '', height: 22, mb: 0.5 }}>
            <Box sx={{ backgroundColor: '#e3f2fd', color: 'black', height: 22, width: '80%', ml: 2 }}>
                <Typography sx={{ ml: 2 }}>{props.text}</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#8BD0E0', color: 'black', height: 22, width: '20%' }}>
                <Typography sx={{ ml: 2 }}>$ {props.value}</Typography>
            </Box>
        </Stack>
    )
}
export default SimpleChart