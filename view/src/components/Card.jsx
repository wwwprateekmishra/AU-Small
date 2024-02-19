import { Box, Card, Stack, Typography } from "@mui/material"

const MyCard = (props) => {
    return (
        <Card sx={props.sx}>
            <Stack direction='row'>
                <Box sx={{ mt: 2, ml: 2 }} >{props.icon}</Box>
                <Box sx={{ ml: 4, mt: 3 }}>
                    <Typography>{props.text}</Typography>
                    <Typography>{props.value}</Typography>
                </Box>
            </Stack>
        </Card>)
}
export default MyCard