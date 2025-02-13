import { Box, Stack, styled, Button } from "@mui/material";

export const StyleClientNweLib = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    background: "var(--background-color)",
    padding: "2rem 0rem",
    bgcolor: "red",
    width: "100%",


    // marginTop: '20px',
  })),

  wrapper: styled(Box)(({}) => ({
    width: "759px",
    height: "auto",
    gap: "1.6rem",
    display: "flex",

    padding: "20px",
    justifyContent: "center",
    borderRadius: "9px",
    border: "1px solid #e5e7eb",

    alignItems: "center",
    boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
    flexDirection: "column",
    "@media (max-width: 750px)": { width: "100%" },
  })),

  newcontainerrCharts: styled(Box)(({}) => ({
    
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    margin: "0",
    boxSizing: "border-box",

  
   
  })),

  wrapperCardBoxCharts: styled(Box)(({}) => ({
    width: "95vw",
    height: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "var(--white-color)",
    borderRadius: "1rem",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
    "@media (max-width: 750px)": {
      width: "100vw",
      height: "100vh",
      padding: "0.5rem",
      borderRadius: "0",  
      boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
    },



    
  })),

  newBoxCharts: styled(Box)(({}) => ({
    width: "100%",
    height: "100%",
    
  })),



  containerChild: styled(Stack)(({}) => ({
    width: "100%",
    display: "grid",

    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "10px",
    "@media (max-width: 550px)": {
      width: "100%",
      gridTemplateColumns: "1fr",
    },
  })),



  wrapperCardBox: styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    gap: "1.3rem",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  })),

  cardBotton: styled(Button)(({}) => ({
    display: "inline-block",
    padding: "12px 28px",
    backgroundColor: "var(--green-color)",
    borderRadius: "5px",
    color: "var(--bg-color)",
    fontSize: "1rem",
    letterSpacing: "1px",
    fontWeight: 600,
    transition: "all 0.45s ease",
    border: "none",
    outline: "none",
    ":hover": {
      background: "var(--light-orange-color)",
      border: "none",
      outline: "none",
      color: "var(--bg-color)",
      transition: "all 0.45s ease",
    },
  })),
};






// import { Box, Stack, styled, Button } from "@mui/material";

// export const StyleClientNweLib = {
//   container: styled(Stack)(({ bg }) => ({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     width: "100%",
//     height: "100vh", // Ajustado para ocupar toda a altura visível
   
//   })),

//   wrapper: styled(Box)(({}) => ({
//     width: "90%", // Ajustável dinamicamente
//     maxWidth: "759px", // Tamanho máximo para telas grandes
//     height: "auto",
//     gap: "1.6rem",
//     display: "flex",
//     padding: "20px",
//     justifyContent: "center",
//     borderRadius: "9px",
//     border: "1px solid #e5e7eb",
//     alignItems: "center",
//     boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
//     flexDirection: "column",
//     backgroundColor: "white",
//     "@media (max-width: 750px)": {
//       width: "95%", // Melhor preenchimento para telas menores
//       padding: "15px",
//     },
//   })),

//   newcontainerrCharts: styled(Box)(({}) => ({
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "0",
//     margin: "0",
//     boxSizing: "border-box",
//   })),

//   wrapperCardBoxCharts: styled(Box)(({}) => ({
//     width: "95%",
//     maxWidth: "1000px", // Limite de largura para grandes telas
//     height: "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     gap: "1rem",
//     padding: "1rem",
//     backgroundColor: "var(--white-color)",
//     borderRadius: "1rem",
//     boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
//     "@media (max-width: 750px)": {
//       width: "100%",
//       padding: "0.5rem",
//       borderRadius: "0",  
//     },
//   })),

//   containerChild: styled(Stack)(({}) => ({
//     width: "100%",
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)", // Layout em colunas
//     gridGap: "10px",
//     "@media (max-width: 550px)": {
//       gridTemplateColumns: "1fr", // Coluna única para telas menores
//     },
//   })),

//   cardBotton: styled(Button)(({}) => ({
//     display: "inline-block",
//     padding: "12px 28px",
//     backgroundColor: "var(--green-color)",
//     borderRadius: "5px",
//     color: "var(--bg-color)",
//     fontSize: "1rem",
//     letterSpacing: "1px",
//     fontWeight: 600,
//     transition: "all 0.45s ease",
//     border: "none",
//     outline: "none",
//     ":hover": {
//       background: "var(--light-orange-color)",
//       color: "var(--bg-color)",
//     },
//   })),
// };
