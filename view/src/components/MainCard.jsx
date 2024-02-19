import { Box } from "@mui/material"

const MainCard = ({ children }) => {
    return (
        <Box sx={{ ml: 30, p: 2, mt: 8, color:'prmary',backgroundColor:'secondary' }}>
            {children}
        </Box>
    )
}
export default MainCard