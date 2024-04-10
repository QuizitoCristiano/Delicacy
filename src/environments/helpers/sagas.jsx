import { Box, Stack, Typography, styled } from "@mui/material";

export const ContainerCarousel  = {
  containerBody: styled(Stack)(({}) => ({
    position: 'relative',
    marginTop: '4rem',
    width: '100%',
    overflow: 'hidden',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    color: 'black',
    padding: '3rem 6% 2rem',
    '@media only screen and (max-width: 800px)': {
      height: 'auto',
      padding: '5rem 1% 2rem',
    },
  })),

    content: styled(Stack)(({}) => ({
      display: "flex",
      maxWidth: "1290px",
      background: "#fefefe",
      height: 'auto',
      "@media only screen and (max-width: 905px)": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        width: "100%",
      },
    })),

      

  wrapper: styled(Typography)(({ }) => ({
  
    fontWeight: '500',
    fontSize: "1.7rem",
    lineHeight: '1.75',
    color: "black",
    padding: "20px 20px",
    height: '100%'
  })),

 

  
}
