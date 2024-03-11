import { Box, Stack } from "@mui/system";
import { Header } from "../Header/Header";






export const MainLayout = ({ children }) => {
    return (
        <>
            <Stack sx={{ width: "100vw", height: "auto" , bgcolor: 'grey	'}}>

             <Header/>
                <Box sx={{ width: "100%", mt: "0vh", height: "100vh", bgcolor: 'black', color:'blue'}}>
                    {children}
                </Box>
            
            </Stack>
        </>
    );
};





