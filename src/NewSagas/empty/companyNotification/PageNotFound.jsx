import {Stack, Box } from "@mui/material"

export const  ErrorPageNotFound = () => {

    return (
        <>           
         <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2rem',
                // backgroundColor: '#F8F9FA',
                bgcolor: 'plum',
                padding: '5rem',
            }}>
                <Box sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#343A40' }}>
                    Não foi possível encontrar o armazenamento local
                </Box>
                <Box sx={{ fontSize: '1.2rem', color: '#6C757D' }}>
                    Tente novamente mais tarde ou verifique a conexão com a internet.
                </Box>

                <Stack>
                    <Box>
                        <button
                            
                            variant="contained"
                            color="primary"
                        >
                            Tentar novamente
                        </button>
                    </Box>
                    <Box>
                        <a href="/">
                            Entre em contato
                        </a>
                    </Box>
                </Stack>
            </Box>
        
        </>
    )
}